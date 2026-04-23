/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ImageBlock } from './ImageBlock';

describe('Image Block', () => {
    it("should convert a chosen asset's backgroundColor string into a color object", async () => {
        const [ImageBlockWithStubs, appBridge] = withAppBridgeBlockStubs(ImageBlock, { editorState: true });
        render(<ImageBlockWithStubs />);

        await userEvent.click(screen.getByTestId('block-inject-button'));
        await userEvent.click(await screen.findByText('Browse asset'));

        await waitFor(() => {
            expect(appBridge.updateBlockSettings.calledWithMatch({ hasBackground: true })).toBe(true);
        });
        expect(appBridge.updateBlockSettings.getCall(0).args[0]).toMatchObject({
            backgroundColor: { red: 115, green: 210, blue: 210, alpha: 1 },
            hasBackground: true,
        });
    });
});
