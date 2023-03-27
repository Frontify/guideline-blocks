/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { AudioBlock } from './AudioBlock';
import { TextPosition } from './types';
import { AUDIO_ID } from './settings';

const AudioBlockSelector = '[data-test-id="audio-block"]';
const AudioTagSelector = '[data-test-id="audio-block-audio-tag"]';
const UploadPlaceholderSelector = '[data-test-id="block-inject-button"]';
const AudioBlockTitleHtmlSelector = '[data-test-id="block-title-html"]';
const AudioBlockDescriptionHtmlSelector = '[data-test-id="block-description-html"]';

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
});
