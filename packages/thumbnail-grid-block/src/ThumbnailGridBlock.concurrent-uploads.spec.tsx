/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ThumbnailGridBlock } from './ThumbnailGridBlock';

const { updateAssetIdsFromKey, resolveUpload, pendingUploads } = vi.hoisted(() => {
    const pending: Record<string, () => void> = {};
    return {
        updateAssetIdsFromKey: vi.fn((itemId: string) => new Promise<void>((resolve) => (pending[itemId] = resolve))),
        resolveUpload: (itemId: string) => pending[itemId]?.(),
        pendingUploads: pending,
    };
});

vi.mock('@frontify/app-bridge', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@frontify/app-bridge')>();
    return {
        ...actual,
        useBlockAssets: () => ({
            blockAssets: {},
            updateAssetIdsFromKey,
            deleteAssetIdsFromKey: vi.fn(),
        }),
    };
});

vi.mock('./components/', async (importOriginal) => {
    const actual = await importOriginal<typeof import('./components/')>();
    return {
        ...actual,
        SortableItem: ({ item, isLoading, onFilesSelected, onFilesUploaded }: any) => (
            <div>
                <span data-testid={`loading-${item.id}`}>{isLoading ? 'loading' : 'ready'}</span>
                <button onClick={() => onFilesSelected([] as unknown as FileList, item.id)}>start {item.id}</button>
                <button
                    onClick={() =>
                        onFilesUploaded(
                            [{ ...AssetDummy.with(Number(item.id)), title: `Uploaded ${item.id}` }],
                            item.id
                        )
                    }
                >
                    finish {item.id}
                </button>
            </div>
        ),
    };
});

describe('Thumbnail Grid Block concurrent uploads', () => {
    it('should clear both loading states when concurrent uploads finish one after the other', async () => {
        const [BlockWithStubs] = withAppBridgeBlockStubs(ThumbnailGridBlock, {
            editorState: true,
            blockSettings: {
                columnCount: '2',
                hasCustomSpacing: false,
                spacingCustom: '10px',
                spacingChoice: 'M',
                items: [
                    { id: '1', title: 'One' },
                    { id: '2', title: 'Two' },
                ],
            },
        });
        updateAssetIdsFromKey.mockClear();
        for (const key of Object.keys(pendingUploads)) {
            delete pendingUploads[key];
        }

        render(<BlockWithStubs />);
        fireEvent.click(screen.getByRole('button', { name: 'start 1' }));
        fireEvent.click(screen.getByRole('button', { name: 'start 2' }));
        fireEvent.click(screen.getByRole('button', { name: 'finish 1' }));
        fireEvent.click(screen.getByRole('button', { name: 'finish 2' }));

        await waitFor(() => expect(updateAssetIdsFromKey).toHaveBeenCalledTimes(2));
        resolveUpload('1');
        await waitFor(() => expect(screen.getByTestId('loading-1')).toHaveTextContent('ready'));
        resolveUpload('2');
        await waitFor(() => {
            expect(screen.getByTestId('loading-1')).toHaveTextContent('ready');
            expect(screen.getByTestId('loading-2')).toHaveTextContent('ready');
        });
    });
});
