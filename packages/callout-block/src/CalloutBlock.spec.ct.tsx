/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { CalloutBlock } from './CalloutBlock';
import { ICON_ASSET_ID } from './settings';
import { Alignment, Appearance, Icon, Padding, Type, Width } from './types';

const CalloutBlockSelector = '[data-test-id="callout-block"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';
const HtmlContent = '[data-test-id="rte-content-html"]';
const CalloutWrapper = '[data-test-id="callout-wrapper"]';
const CalloutIcon = '[data-test-id="callout-icon"]';
const CalloutIconCustom = '[data-test-id="callout-icon-custom"]';
const CalloutIconInfo = '[data-test-id="callout-icon-info"]';

const EXAMPLE_THEME_SETTINGS =
    ':root {--f-theme-settings-accent-color-info-color: rgba(26, 199, 211, 1); --f-theme-settings-accent-color-note-color: rgba(246, 216, 56, 1); --f-theme-settings-accent-color-tip-color: rgba(42, 191, 24, 1); --f-theme-settings-accent-color-warning-color: rgba(222, 27, 27, 1);}';

describe('Callout Block', () => {
    it('renders a callout block in edit mode', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, { editorState: true });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutBlockSelector).should('exist');
        cy.get(RichTextEditor).should('exist');
    });

    it('should not be able to input to a callout block when in view mode', () => {
        const [TextBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: { textValue: 'Text value' },
        });

        mount(<TextBlockWithStubs />);
        cy.get(HtmlContent).should('have.text', 'Text value');
        cy.get(RichTextEditor).should('not.exist');
    });

    it('renders a callout block with the correct layout settings', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                alignment: Alignment.Right,
                paddingChoice: Padding.L,
                width: Width.HugContents,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutBlockSelector).should('have.class', 'tw-flex');
        cy.get(CalloutBlockSelector).should('have.class', 'tw-justify-end');
        cy.get(CalloutWrapper).should('have.class', 'tw-px-[30px]').should('have.class', 'tw-py-[25px]');
    });

    it('renders a callout block with the correct border radius style', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                hasExtendedCustomRadius: true,
                extendedRadiusTopLeft: '10px',
                extendedRadiusTopRight: '20px',
                extendedRadiusBottomLeft: '40px',
                extendedRadiusBottomRight: '30px',
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutWrapper).should('have.css', 'border-radius', '10px 20px 30px 40px');
    });

    it('renders a callout block with a predefined icon', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                iconSwitch: false,
                iconType: Icon.Info,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutIcon).should('exist');
        cy.get(CalloutIconInfo).should('exist');
    });

    it('renders a callout block with a custom icon', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockAssets: {
                [ICON_ASSET_ID]: [AssetDummy.with(342)],
            },
            blockSettings: {
                iconSwitch: true,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutIcon).should('exist');
        cy.get(CalloutIconCustom).should('exist');
    });

    it('renders a callout block without icon', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                iconSwitch: false,
                iconType: Icon.None,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutIcon).should('not.exist');
    });

    it('renders a callout block without icon when no custom icon url is defined', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                iconSwitch: true,
                iconType: Icon.Info,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutIcon).should('not.exist');
    });

    it('renders a callout block with the correct colors for type info', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is an info',
                type: Type.Info,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = EXAMPLE_THEME_SETTINGS;
            doc.head.appendChild(style);
        });

        cy.get(CalloutWrapper).should('have.css', 'background-color', 'rgba(26, 199, 211, 0.1)');
        cy.get(HtmlContent).should('have.css', 'color', 'rgb(26, 199, 211)');
    });

    it('renders a callout block with the correct colors for type note', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a note',
                type: Type.Note,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = EXAMPLE_THEME_SETTINGS;
            doc.head.appendChild(style);
        });

        cy.get(CalloutWrapper).should('have.css', 'background-color', 'rgba(246, 216, 56, 0.1)');
        cy.get(HtmlContent).should('have.css', 'color', 'rgb(103, 88, 5)');
    });

    it('renders a callout block with the correct colors for type tip', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a tip',
                type: Type.Tip,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = EXAMPLE_THEME_SETTINGS;
            doc.head.appendChild(style);
        });

        cy.get(CalloutWrapper).should('have.css', 'background-color', 'rgba(42, 191, 24, 0.1)');
        cy.get(HtmlContent).should('have.css', 'color', 'rgb(42, 191, 24)');
    });

    it('renders a callout block with the correct colors for type warning', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a warning',
                type: Type.Warning,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = EXAMPLE_THEME_SETTINGS;
            doc.head.appendChild(style);
        });

        cy.get(CalloutWrapper).should('have.css', 'background-color', 'rgba(222, 27, 27, 0.1)');
        cy.get(HtmlContent).should('have.css', 'color', 'rgb(222, 27, 27)');
    });

    it('renders a warning block with the overwritten css variables for the theme styles', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a warning',
                type: Type.Warning,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = EXAMPLE_THEME_SETTINGS;
            doc.head.appendChild(style);
        });

        cy.get(CalloutBlockSelector).should(
            'have.attr',
            'style',
            '--f-theme-settings-heading1-color:rgba(222, 27, 27, 1); --f-theme-settings-heading2-color:rgba(222, 27, 27, 1); --f-theme-settings-heading3-color:rgba(222, 27, 27, 1); --f-theme-settings-heading4-color:rgba(222, 27, 27, 1); --f-theme-settings-custom1-color:rgba(222, 27, 27, 1); --f-theme-settings-custom2-color:rgba(222, 27, 27, 1); --f-theme-settings-custom3-color:rgba(222, 27, 27, 1); --f-theme-settings-body-color:rgba(222, 27, 27, 1); --f-theme-settings-quote-color:rgba(222, 27, 27, 1); --f-theme-settings-link-color:rgba(222, 27, 27, 1); --f-theme-settings-link-text-decoration:underline; color: rgb(222, 27, 27);'
        );
    });

    it('renders a note block with the overwritten css variables for the theme styles', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a note',
                type: Type.Note,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = EXAMPLE_THEME_SETTINGS;
            doc.head.appendChild(style);
        });

        cy.get(CalloutBlockSelector).should(
            'have.attr',
            'style',
            '--f-theme-settings-heading1-color:rgb(103, 88, 5); --f-theme-settings-heading2-color:rgb(103, 88, 5); --f-theme-settings-heading3-color:rgb(103, 88, 5); --f-theme-settings-heading4-color:rgb(103, 88, 5); --f-theme-settings-custom1-color:rgb(103, 88, 5); --f-theme-settings-custom2-color:rgb(103, 88, 5); --f-theme-settings-custom3-color:rgb(103, 88, 5); --f-theme-settings-body-color:rgb(103, 88, 5); --f-theme-settings-quote-color:rgb(103, 88, 5); --f-theme-settings-link-color:rgb(103, 88, 5); --f-theme-settings-link-text-decoration:underline; color: rgb(103, 88, 5);'
        );
    });

    it('renders a callout block with light appearance', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a note',
                type: Type.Note,
                appearance: Appearance.Light,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = ':root {--f-theme-settings-accent-color-note-color: rgba(50, 40, 145, 1);';
            doc.head.appendChild(style);
        });

        cy.get(CalloutWrapper).should('have.css', 'background-color', 'rgba(50, 40, 145, 0.1)');
        cy.get(HtmlContent).should('have.css', 'color', 'rgb(50, 40, 145)');
    });

    it('renders a callout block with strong appearance', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock, {
            blockSettings: {
                textValue: 'This is a note',
                type: Type.Note,
                appearance: Appearance.Strong,
            },
        });

        mount(<CalloutBlockWithStubs />);
        cy.document().then((doc) => {
            const style = doc.createElement('style');
            style.innerHTML = ':root {--f-theme-settings-accent-color-note-color: rgba(50, 40, 145, 1);';
            doc.head.appendChild(style);
        });

        cy.get(CalloutWrapper).should('have.css', 'background-color', 'rgb(50, 40, 145)');
        cy.get(HtmlContent).should('have.css', 'color', 'rgb(255, 255, 255)');
    });
});
