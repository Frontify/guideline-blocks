/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconMagnifier16 } from '@frontify/fondue';
import { mount } from 'cypress/react';
import React from 'react';
import { BlockItemWrapper } from './BlockItemWrapper';

const BlockItemWrapperSelector = '[data-test-id="block-item-wrapper"]';
const ToolbarSelector = '[data-test-id="block-item-wrapper-toolbar"]';
const FlyoutSelector = '[data-test-id="block-item-wrapper-toolbar-flyout"]';
const MenuItemSelector = '[data-test-id="menu-item"]';
const ToolbarButtonSelector = '[data-test-id="block-item-wrapper-toolbar-btn"]';
const ChildSelector = '[data-test-id="block-item-wrapper-child"]';

describe('Block Item Wrapper', () => {
    it('should render the wrapper and the children', () => {
        mount(
            <BlockItemWrapper toolbarFlyoutItems={[]} toolbarItems={[]}>
                <div data-test-id="block-item-wrapper-child" className="tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(BlockItemWrapperSelector).should('exist');
        cy.get(ChildSelector).should('exist');
    });

    it('should render the outline class', () => {
        mount(
            <BlockItemWrapper toolbarFlyoutItems={[]} toolbarItems={[]}>
                <div data-test-id="block-item-wrapper-child" className="tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(BlockItemWrapperSelector).should('have.class', 'hover:tw-outline');
    });

    it('should not render the outline class if the hide prop is set', () => {
        mount(
            <BlockItemWrapper toolbarFlyoutItems={[]} toolbarItems={[]} shouldHideWrapper>
                <div data-test-id="block-item-wrapper-child" className="tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(BlockItemWrapperSelector).should('not.have.class', 'hover:tw-outline');
    });

    it('should render the right amount of toolbar items', () => {
        mount(
            <BlockItemWrapper
                toolbarFlyoutItems={[]}
                toolbarItems={[
                    { icon: <IconMagnifier16 />, onClick: cy.stub(), tooltip: 'Test tooltip' },
                    { icon: <IconMagnifier16 />, onClick: cy.stub(), tooltip: 'Test tooltip' },
                ]}
            >
                <div data-test-id="block-item-wrapper-child" className="tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(ToolbarButtonSelector).should('have.length', 2);
    });
    it('should render the flyout button with the right amount of menu items', () => {
        mount(
            <BlockItemWrapper
                toolbarFlyoutItems={[
                    [
                        {
                            icon: <IconMagnifier16 />,
                            onClick: cy.stub(),
                            title: 'Test title',
                        },
                    ],
                    [
                        {
                            icon: <IconMagnifier16 />,
                            onClick: cy.stub(),
                            title: 'Test title',
                        },
                        {
                            icon: <IconMagnifier16 />,
                            onClick: cy.stub(),
                            title: 'Test title',
                        },
                    ],
                ]}
                toolbarItems={[]}
            >
                <div data-test-id="block-item-wrapper-child" className="tw-mt-8 tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(ToolbarSelector).parent().invoke('attr', 'style', 'opacity:1');
        cy.get(FlyoutSelector).should('exist');
        cy.get(FlyoutSelector).click({ force: true });
        cy.get(MenuItemSelector).should('have.length', 3);
    });

    it('should render the outline if the wrapper is focused', () => {
        mount(
            <BlockItemWrapper toolbarFlyoutItems={[]} toolbarItems={[]}>
                <div data-test-id="block-item-wrapper-child" className="tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(BlockItemWrapperSelector).focus();
        cy.get(BlockItemWrapperSelector).should('have.css', 'outline-style', 'solid');
    });

    it('should render the toolbar if the wrapper is focused', () => {
        mount(
            <BlockItemWrapper
                toolbarFlyoutItems={[]}
                toolbarItems={[
                    { icon: <IconMagnifier16 />, onClick: cy.stub(), tooltip: 'Test tooltip' },
                    { icon: <IconMagnifier16 />, onClick: cy.stub(), tooltip: 'Test tooltip' },
                ]}
            >
                <div data-test-id="block-item-wrapper-child" className="tw-w-8 tw-h-8 tw-bg-red-50" />
            </BlockItemWrapper>
        );
        cy.get(BlockItemWrapperSelector).focus();
        cy.get(ToolbarSelector).should('be.visible');
    });
});
