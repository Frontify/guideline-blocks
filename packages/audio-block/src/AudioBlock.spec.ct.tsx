/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { AudioBlock } from './AudioBlock';
import { TextPosition } from './types';
import { AUDIO_ID } from './settings';
const AudioBlockSelector = '[data-test-id="audio-block"]';
const AudioBlockContainerSelector = '[data-test-id="audio-block-container"]';
const AudioTagSelector = '[data-test-id="audio-block-audio-tag"]';

describe('Audio Block', () => {
    it('renders an audio block', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock);

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('exist');
    });

    it('renders an empty audio block in view mode', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock);

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('exist');
        cy.get(AudioBlockSelector).contains('Add Audio asset').should('exist');
    });

    it('renders an empty audio block in edit mode', () => {
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            editorState: true,
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).should('exist');
        cy.get(AudioBlockSelector).contains('Add Audio asset').should('exist');
    });

    it('renders an audio block with an audio asset in view mode', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockAssets: {
                AUDIO_ID: [asset],
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
                AUDIO_ID: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioTagSelector).should('exist');
    });

    it('renders an audio block with an audio asset in view mode with title', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                title: 'Audio Title',
            },
            blockAssets: {
                AUDIO_ID: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).contains('Audio Title').should('exist');
    });

    it('renders an audio block with an audio asset in view mode with description', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                description: 'Audio Description',
            },
            blockAssets: {
                AUDIO_ID: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).contains('Audio Description').should('exist');
    });

    it('renders an audio block with an audio asset in view mode with title and description', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                title: 'Audio Title',
                description: 'Audio Description',
            },
            blockAssets: {
                AUDIO_ID: [asset],
            },
        });

        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockSelector).contains('Audio Title').should('exist');
        cy.get(AudioBlockSelector).contains('Audio Description').should('exist');
    });

    it('renders an audio block with an audio asset in view mode with text position above', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                positioning: TextPosition.Above,
            },
            blockAssets: {
                AUDIO_ID: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockContainerSelector).should('have.class', 'tw-flex-col-reverse');
    });

    it('renders an audio block with an audio asset in view mode with text position below', () => {
        const asset = AssetDummy.with(312);
        const [AudioBlockWithStubs] = withAppBridgeBlockStubs(AudioBlock, {
            blockSettings: {
                positioning: TextPosition.Below,
            },
            blockAssets: {
                AUDIO_ID: [asset],
            },
        });
        mount(<AudioBlockWithStubs />);
        cy.get(AudioBlockContainerSelector).should('not.have.class', 'tw-flex-col-reverse');
    });
});
