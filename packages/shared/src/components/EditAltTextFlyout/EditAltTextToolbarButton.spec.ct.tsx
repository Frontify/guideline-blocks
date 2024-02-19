/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { mount } from 'cypress/react18';

import { getEditAltTextToolbarButton } from './EditAltTextToolbarButton';

import '@frontify/guideline-blocks-settings/styles';

const ToolbarFlyoutSelector = '[data-test-id="block-item-wrapper-toolbar-flyout"]';
const FlyoutMenuSelector = '[data-test-id="flyout-menu"]';
const TextInputSelector = '[data-test-id="text-input"]';
const CancelButtonSelector = '[data-test-id="cancel-button"]';
const SaveButtonSelector = '[data-test-id="save-button"]';
const TooltipSelector = '[data-test-id="toolbar-button-tooltip"]';

describe('getEditAltTextToolbarButton', () => {
    it('should display flyout screen and set localAltText', () => {
        const VALUE = 'text';
        const setLocalAltTextStub = cy.stub();

        mount(
            <div className="tw-p-20">
                <BlockItemWrapper
                    toolbarItems={[
                        getEditAltTextToolbarButton({
                            setBlockSettings: cy.stub(),
                            blockSettings: {},
                            localAltText: '',
                            setLocalAltText: setLocalAltTextStub,
                        }),
                    ]}
                >
                    <div>Block</div>
                </BlockItemWrapper>
            </div>
        );

        cy.get(ToolbarFlyoutSelector).should('have.length', 1).focus();
        cy.get(ToolbarFlyoutSelector).should('be.visible').click();
        cy.get(FlyoutMenuSelector).should('be.visible');

        cy.get(TextInputSelector).type(VALUE);
        cy.wrap(setLocalAltTextStub).should('have.callCount', VALUE.length);
    });

    it('should reset localAltText on cancel', () => {
        const OLD_VALUE = 'old-text';
        const setLocalAltTextStub = cy.stub();

        mount(
            <div className="tw-p-20">
                <BlockItemWrapper
                    toolbarItems={[
                        getEditAltTextToolbarButton({
                            setBlockSettings: cy.stub(),
                            blockSettings: { altText: OLD_VALUE },
                            localAltText: '',
                            setLocalAltText: setLocalAltTextStub,
                        }),
                    ]}
                >
                    <div>Block</div>
                </BlockItemWrapper>
            </div>
        );

        cy.get(ToolbarFlyoutSelector).should('have.length', 1).focus();
        cy.get(ToolbarFlyoutSelector).should('be.visible').click();
        cy.get(FlyoutMenuSelector).should('be.visible');

        cy.get(CancelButtonSelector).click();
        cy.wrap(setLocalAltTextStub).should('have.been.calledOnceWith', OLD_VALUE);
    });

    it('should update blockSettings with localAltText when save pressed', () => {
        const NEW_VALUE = 'text';
        const setBlockSettingsStub = cy.stub();

        mount(
            <div className="tw-p-20">
                <BlockItemWrapper
                    toolbarItems={[
                        getEditAltTextToolbarButton({
                            setBlockSettings: setBlockSettingsStub,
                            blockSettings: { altText: '' },
                            localAltText: NEW_VALUE,
                            setLocalAltText: cy.stub(),
                        }),
                    ]}
                >
                    <div>Block</div>
                </BlockItemWrapper>
            </div>
        );

        cy.get(ToolbarFlyoutSelector).should('have.length', 1).focus();
        cy.get(ToolbarFlyoutSelector).should('be.visible').click();
        cy.get(FlyoutMenuSelector).should('be.visible');

        cy.get(SaveButtonSelector).click();
        cy.wrap(setBlockSettingsStub).should('have.been.calledOnceWith', { altText: NEW_VALUE });
    });

    it('should have correct tooltip content', () => {
        const NEW_VALUE = 'text';
        const setBlockSettingsStub = cy.stub();

        mount(
            <BlockItemWrapper
                toolbarItems={[
                    getEditAltTextToolbarButton({
                        setBlockSettings: setBlockSettingsStub,
                        blockSettings: { altText: '' },
                        localAltText: NEW_VALUE,
                        setLocalAltText: cy.stub(),
                    }),
                ]}
            >
                <div>Block</div>
            </BlockItemWrapper>
        );

        cy.get(ToolbarFlyoutSelector).should('have.length', 1).focus();
        cy.get(TooltipSelector).should('be.visible').and('have.text', 'Set alt text');
    });
});
