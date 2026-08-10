/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy } from '@frontify/app-bridge';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DoDontItem } from './DoDontItem';
import { BlockMode, type DoDontItemProps, DoDontStyle, DoDontType } from './types';

import type * as GuidelineBlocksSettings from '@frontify/guideline-blocks-settings';

const DOS_DONTS_ASSETS = 'dos-donts-assets';

vi.mock('./DosDontsAssets', () => ({
    DosDontsAssets: () => <div data-test-id="dos-donts-assets" />,
}));

vi.mock('@frontify/guideline-blocks-settings', async (importOriginal) => ({
    ...(await importOriginal<typeof GuidelineBlocksSettings>()),
    RichTextEditor: () => <div data-test-id="rich-text-editor" />,
    getDefaultPluginsWithLinkChooser: () => [],
}));

const defaultProps = {
    id: 'item-1',
    type: DoDontType.Do,
    style: DoDontStyle.Text,
    doColor: { red: 0, green: 200, blue: 165, alpha: 1 },
    dontColor: { red: 255, green: 55, blue: 90, alpha: 1 },
    onChangeItem: vi.fn(),
    onChangeLocalItem: vi.fn(),
    title: 'Title',
    body: 'Body',
    editing: false,
    onRemoveSelf: vi.fn(),
    doIconChoice: undefined,
    dontIconChoice: undefined,
    doIconAsset: undefined,
    dontIconAsset: undefined,
    mode: BlockMode.TEXT_AND_IMAGE,
    linkedImage: AssetDummy.with(1),
    appBridge: {
        context: () => ({ get: () => 'block-id' }),
    },
} as unknown as DoDontItemProps;

const renderDoDontItem = (props: Partial<DoDontItemProps> = {}) => render(<DoDontItem {...defaultProps} {...props} />);

describe('DoDontItem', () => {
    it('renders the assets in text and image mode', () => {
        renderDoDontItem({ mode: BlockMode.TEXT_AND_IMAGE });

        expect(screen.getByTestId(DOS_DONTS_ASSETS)).toBeInTheDocument();
    });

    it('does not render the assets in text mode', () => {
        renderDoDontItem({ mode: BlockMode.TEXT });

        expect(screen.queryByTestId(DOS_DONTS_ASSETS)).toBeNull();
    });
});
