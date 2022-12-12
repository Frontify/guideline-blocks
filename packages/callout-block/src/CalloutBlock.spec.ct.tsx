/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react';
import { CalloutBlock } from './CalloutBlock';
import { ICON_ASSET_ID } from './settings';
import { Alignment, Icon, Padding, Width } from './types';

const CalloutBlockSelector = '[data-test-id="callout-block"]';
const CalloutWrapper = '[data-test-id="callout-wrapper"]';
const CalloutIcon = '[data-test-id="callout-icon"]';
const CalloutIconCustom = '[data-test-id="callout-icon-custom"]';
const CalloutIconInfo = '[data-test-id="callout-icon-info"]';

describe('Callout Block', () => {
    it('renders a callout block', () => {
        const [CalloutBlockWithStubs] = withAppBridgeBlockStubs(CalloutBlock);

        mount(<CalloutBlockWithStubs />);
        cy.get(CalloutBlockSelector).should('exist');
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
        cy.get(CalloutWrapper).should('have.css', 'border-radius').and('eq', '10px 20px 30px 40px');
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
});
