/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { Security } from '@frontify/guideline-blocks-settings';
import { mount } from 'cypress/react18';

import { AudioBlock } from './AudioBlock';
import { TextPosition } from './types';
import { ATTACHMENTS_ASSET_ID, AUDIO_ID } from './settings';

const AudioBlockSelector = '[data-test-id="audio-block"]';
const AudioTagSelector = '[data-test-id="audio-block-audio-tag"]';
const UploadPlaceholderSelector = '[data-test-id="block-inject-button"]';
const AudioBlockTitleHtmlSelector = '[data-test-id="block-title"] [data-test-id="rte-content-html"]';
const AudioBlockTitleRteSelector = '[data-test-id="block-title"]';
const AudioBlockDescriptionHtmlSelector = '[data-test-id="block-description"] [data-test-id="rte-content-html"]';
const DownloadButtonSelector = '[data-test-id="download-button"]';
const AttachmentsTriggerSelector = '[data-test-id="attachments-flyout-button"]';
const ViewModeAddonsSelector = '[data-test-id="view-mode-addons"]';
const BlockWrapperSelector = '[data-test-id="block-item-wrapper"]';
const UploadMenu = '[data-test-id="menu-item-title"]';

const Title = '[{"type":"heading3","children":[{"text":"Audio Title"}]}]';
const Description = '[{"type":"p","children":[{"text":"Audio Description"}]}]';

describe('Audio Block', () => {
    it('renders an empty audio block in view mode', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock);

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('exist');
        cy.get(UploadPlaceholderSelector).should('not.exist');
    });

    it('renders an empty audio block in edit mode', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            editorState: true,
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('exist');
        cy.get(UploadPlaceholderSelector).should('exist');
    });

    it('renders an audio block with an audio asset in view mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioTagSelector).should('exist');
    });

    it('renders an audio block with an audio asset in editor mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            editorState: true,
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioTagSelector).should('exist');
    });

    it('renders an audio block with an audio asset in view mode with title', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                title: Title,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockTitleHtmlSelector).contains('Audio Title').should('exist');
    });

    it('renders an audio block with an audio asset in view mode with description', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                description: Description,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockDescriptionHtmlSelector).should('exist');
    });

    it('renders an audio block with an audio asset in view mode with title and description', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                title: Title,
                description: Description,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockTitleHtmlSelector).should('exist');
        cy.get(AudioBlockDescriptionHtmlSelector).should('exist');
    });

    it('renders an audio block with an audio asset in view mode with text position above', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                positioning: TextPosition.Above,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('have.css', 'flex-direction', 'column-reverse');
    });

    it('renders an audio block with an audio asset in view mode with text position below', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                positioning: TextPosition.Below,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('have.css', 'flex-direction', 'column');
    });

    it('renders an audio block with download button as its set in the security settings', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                security: Security.Custom,
                downloadable: true,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(DownloadButtonSelector).should('exist');
    });

    it('renders an audio block without download button as its not allowed by the security settings', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                security: Security.Custom,
                downloadable: false,
            },
            blockAssets: {
                [AUDIO_ID]: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(DownloadButtonSelector).should('not.exist');
    });

    it('should render attachment button in view mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockAssets: {
                [ATTACHMENTS_ASSET_ID]: [asset, asset],
                [AUDIO_ID]: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(AttachmentsTriggerSelector).should('have.length', 1).and('be.visible').and('contain.text', 2);
    });

    it('should hide block wrapper and toolbar in view mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockAssets: {
                [ATTACHMENTS_ASSET_ID]: [asset, asset],
                [AUDIO_ID]: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(BlockWrapperSelector).should('not.exist');
    });

    it('should render attachment toolbar button in edit mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockAssets: {
                [ATTACHMENTS_ASSET_ID]: [asset, asset],
                [AUDIO_ID]: [asset],
            },
            editorState: true,
        });
        mount(<AudioBlockWithStubs />);
        cy.get(AttachmentsTriggerSelector).should('have.length', 1).and('not.be.visible').and('contain.text', 2);
    });

    it('should hide download and attachment buttons in edit mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockAssets: {
                [ATTACHMENTS_ASSET_ID]: [asset, asset],
                [AUDIO_ID]: [asset],
            },
            editorState: true,
        });
        mount(<AudioBlockWithStubs />);
        cy.get(ViewModeAddonsSelector).should('not.exist');
    });

    it('should add the file name to the title when the title is empty', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            editorState: true,
        });
        mount(<AudioBlockWithStubs />);
        cy.get(UploadPlaceholderSelector).click();
        cy.get(UploadMenu).eq(1).click();
        cy.get(AudioBlockTitleRteSelector).contains('A title').should('exist');
    });

    it('should not add the file name to the title when the title is not empty', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            editorState: true,
            blockSettings: {
                title: Title,
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(UploadPlaceholderSelector).click();
        cy.get(UploadMenu).eq(1).click();
        cy.get(AudioBlockTitleRteSelector).contains('Audio Title').should('exist');
        cy.get(AudioBlockTitleRteSelector).contains('A title').should('not.exist');
    });
});
