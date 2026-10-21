/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';
import { Security } from '@frontify/guideline-blocks-settings';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AudioBlock } from './AudioBlock';
import { ATTACHMENTS_ASSET_ID, AUDIO_ID } from './settings';
import { TextPosition } from './types';

const AUDIO_BLOCK_TEST_ID = 'audio-block';
const AUDIO_TAG_TEST_ID = 'audio-block-audio-tag';
const UPLOAD_PLACEHOLDER_TEST_ID = 'block-inject-button';
const BLOCK_TITLE_TEST_ID = 'block-title';
const BLOCK_DESCRIPTION_TEST_ID = 'block-description';
const RTE_CONTENT_HTML_TEST_ID = 'rte-content-html';
const DOWNLOAD_BUTTON_TEST_ID = 'download-button';
const ATTACHMENTS_TRIGGER_TEST_ID = 'attachments-flyout-button';
const VIEW_MODE_ADDONS_TEST_ID = 'view-mode-addons';
const BLOCK_WRAPPER_TEST_ID = 'block-item-wrapper';
const BLOCK_WRAPPER_TOOLBAR_TEST_ID = 'block-item-wrapper-toolbar';
const UPLOAD_MENU_TEST_ID = 'fondue-dropdown-subtrigger';

const Title = '[{"type":"heading3","children":[{"text":"Audio Title"}]}]';
const Description = '[{"type":"p","children":[{"text":"Audio Description"}]}]';

const renderAudioBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [AudioBlockWithStubs, appBridge] = withAppBridgeBlockStubs(AudioBlock, appBridgeProps);
    const utils = render(<AudioBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Audio Block', () => {
    it('should render an empty audio block in view mode', () => {
        renderAudioBlock();

        expect(screen.getByTestId(AUDIO_BLOCK_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(UPLOAD_PLACEHOLDER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render an empty audio block in edit mode', () => {
        renderAudioBlock({ editorState: true });

        expect(screen.getByTestId(AUDIO_BLOCK_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(UPLOAD_PLACEHOLDER_TEST_ID)).toBeInTheDocument();
    });

    it('should render an audio block with an audio asset in view mode', () => {
        renderAudioBlock({ blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] } });

        expect(screen.getByTestId(AUDIO_TAG_TEST_ID)).toBeInTheDocument();
    });

    it('should render an audio block with an audio asset in edit mode', () => {
        renderAudioBlock({ editorState: true, blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] } });

        expect(screen.getByTestId(AUDIO_TAG_TEST_ID)).toBeInTheDocument();
    });

    it('should render an audio block with an audio asset in view mode with title', async () => {
        renderAudioBlock({
            blockSettings: { title: Title },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        await waitFor(() => {
            expect(
                within(screen.getByTestId(BLOCK_TITLE_TEST_ID)).getByTestId(RTE_CONTENT_HTML_TEST_ID)
            ).toHaveTextContent('Audio Title');
        });
    });

    it('should render an audio block with an audio asset in view mode with description', async () => {
        renderAudioBlock({
            blockSettings: { description: Description },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        expect(
            await within(screen.getByTestId(BLOCK_DESCRIPTION_TEST_ID)).findByTestId(RTE_CONTENT_HTML_TEST_ID)
        ).toBeInTheDocument();
    });

    it('should render an audio block with an audio asset in view mode with title and description', async () => {
        renderAudioBlock({
            blockSettings: { title: Title, description: Description },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        expect(
            await within(screen.getByTestId(BLOCK_TITLE_TEST_ID)).findByTestId(RTE_CONTENT_HTML_TEST_ID)
        ).toBeInTheDocument();
        expect(
            await within(screen.getByTestId(BLOCK_DESCRIPTION_TEST_ID)).findByTestId(RTE_CONTENT_HTML_TEST_ID)
        ).toBeInTheDocument();
    });

    it('should render the text above the audio when text position is above', () => {
        renderAudioBlock({
            blockSettings: { positioning: TextPosition.Above },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        expect(screen.getByTestId(AUDIO_BLOCK_TEST_ID)).toHaveClass('tw-flex-col-reverse');
    });

    it('should render the text below the audio when text position is below', () => {
        renderAudioBlock({
            blockSettings: { positioning: TextPosition.Below },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        const block = screen.getByTestId(AUDIO_BLOCK_TEST_ID);
        expect(block).toHaveClass('tw-flex-col');
        expect(block).not.toHaveClass('tw-flex-col-reverse');
    });

    it('should render the download button when the security settings allow it', () => {
        renderAudioBlock({
            blockSettings: { security: Security.Custom, downloadable: true },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        expect(screen.getByTestId(DOWNLOAD_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('should not render the download button when the security settings do not allow it', () => {
        renderAudioBlock({
            blockSettings: { security: Security.Custom, downloadable: false },
            blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
        });

        expect(screen.queryByTestId(DOWNLOAD_BUTTON_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render the attachment button in view mode', () => {
        const asset = AssetDummy.with(312);
        renderAudioBlock({ blockAssets: { [ATTACHMENTS_ASSET_ID]: [asset, asset], [AUDIO_ID]: [asset] } });

        const triggers = screen.getAllByTestId(ATTACHMENTS_TRIGGER_TEST_ID);
        expect(triggers).toHaveLength(1);
        expect(triggers[0]).toHaveTextContent('2');
    });

    it('should not render the block wrapper and toolbar in view mode', () => {
        const asset = AssetDummy.with(312);
        renderAudioBlock({ blockAssets: { [ATTACHMENTS_ASSET_ID]: [asset, asset], [AUDIO_ID]: [asset] } });

        expect(screen.queryByTestId(BLOCK_WRAPPER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render the attachment toolbar button in edit mode', () => {
        const asset = AssetDummy.with(312);
        renderAudioBlock({
            editorState: true,
            blockAssets: { [ATTACHMENTS_ASSET_ID]: [asset, asset], [AUDIO_ID]: [asset] },
        });

        const triggers = screen.getAllByTestId(ATTACHMENTS_TRIGGER_TEST_ID);
        expect(triggers).toHaveLength(1);
        expect(triggers[0]).toHaveTextContent('2');
        // TODO(vitest-migration): the "not visible until hover" check dropped — BlockItemWrapper hides its toolbar with Tailwind opacity classes, which happy-dom doesn't compute.
        expect(within(screen.getByTestId(BLOCK_WRAPPER_TOOLBAR_TEST_ID)).getByTestId(ATTACHMENTS_TRIGGER_TEST_ID)).toBe(
            triggers[0]
        );
    });

    it('should not render the download and attachment buttons in edit mode', () => {
        const asset = AssetDummy.with(312);
        renderAudioBlock({
            editorState: true,
            blockAssets: { [ATTACHMENTS_ASSET_ID]: [asset, asset], [AUDIO_ID]: [asset] },
        });

        expect(screen.queryByTestId(VIEW_MODE_ADDONS_TEST_ID)).not.toBeInTheDocument();
    });

    it('should add the file name to the title when the title is empty', async () => {
        renderAudioBlock({ editorState: true });

        await userEvent.click(screen.getByTestId(UPLOAD_PLACEHOLDER_TEST_ID));
        const uploadMenuItems = await screen.findAllByTestId(UPLOAD_MENU_TEST_ID);
        await userEvent.click(uploadMenuItems[1]);

        await waitFor(() => {
            expect(screen.getByTestId(BLOCK_TITLE_TEST_ID)).toHaveTextContent('A title');
        });
    });

    it('should not add the file name to the title when the title is not empty', async () => {
        renderAudioBlock({ editorState: true, blockSettings: { title: Title } });

        await userEvent.click(screen.getByTestId(UPLOAD_PLACEHOLDER_TEST_ID));
        const uploadMenuItems = await screen.findAllByTestId(UPLOAD_MENU_TEST_ID);
        await userEvent.click(uploadMenuItems[1]);

        await waitFor(() => {
            expect(screen.getByTestId(AUDIO_TAG_TEST_ID)).toBeInTheDocument();
        });
        expect(screen.getByTestId(BLOCK_TITLE_TEST_ID)).toHaveTextContent('Audio Title');
        expect(screen.getByTestId(BLOCK_TITLE_TEST_ID)).not.toHaveTextContent('A title');
    });
});
