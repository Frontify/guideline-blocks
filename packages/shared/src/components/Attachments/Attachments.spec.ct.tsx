/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { AssetDummy, getAppBridgeBlockStub } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { Attachments as AttachmentsComponent } from './Attachments';
import { AttachmentsProps } from './types';

const FlyoutButtonSelector = '[data-test-id="attachments-flyout-button"]';
const AssetInputSelector = '[data-test-id="asset-input-placeholder"]';
const ActionBarSelector = '[data-test-id="attachments-actionbar"]';
const AttachmentItemSelector = '[data-test-id="attachments-item"]';

const Attachments = ({
    appBridge = getAppBridgeBlockStub(),
    onDelete = cy.stub(),
    items,
    onReplaceWithBrowse = cy.stub(),
    onReplaceWithUpload = cy.stub(),
    onSorted = cy.stub(),
    onBrowse = cy.stub(),
    onUpload = cy.stub(),
}: Partial<AttachmentsProps>) => {
    return (
        <AttachmentsComponent
            appBridge={appBridge}
            onDelete={onDelete}
            items={items}
            onReplaceWithBrowse={onReplaceWithBrowse}
            onReplaceWithUpload={onReplaceWithUpload}
            onSorted={onSorted}
            onBrowse={onBrowse}
            onUpload={onUpload}
        />
    );
};

describe('Attachments', () => {
    it('renders attachments flyout if it is in edit mode', () => {
        mount(<Attachments appBridge={getAppBridgeBlockStub({ editorState: true })} />);
        cy.get(FlyoutButtonSelector).should('exist');
    });

    it('renders attachments flyout if it has attachments', () => {
        mount(<Attachments items={[AssetDummy.with(1)]} />);
        cy.get(FlyoutButtonSelector).should('exist');
    });

    it('does not render attachments flyout if there are no attachments', () => {
        mount(<Attachments items={[]} />);
        cy.get(FlyoutButtonSelector).should('not.exist');
    });

    it('renders asset input if in edit mode', () => {
        mount(<Attachments appBridge={getAppBridgeBlockStub({ editorState: true })} items={[AssetDummy.with(1)]} />);
        cy.get(FlyoutButtonSelector).click();
        cy.get(AssetInputSelector).should('exist');
    });

    it('does not render asset input if in view mode', () => {
        mount(<Attachments items={[AssetDummy.with(1)]} />);
        cy.get(FlyoutButtonSelector).click();
        cy.get(AssetInputSelector).should('not.exist');
    });

    it('renders asset action buttons if in edit mode', () => {
        mount(<Attachments appBridge={getAppBridgeBlockStub({ editorState: true })} items={[AssetDummy.with(1)]} />);
        cy.get(FlyoutButtonSelector).click();
        cy.get(ActionBarSelector).should('exist');
    });

    it('does not render asset action buttons if in view mode', () => {
        mount(<Attachments items={[AssetDummy.with(1)]} />);
        cy.get(FlyoutButtonSelector).click();
        cy.get(ActionBarSelector).should('not.exist');
    });

    it('renders an attachment item for each asset', () => {
        mount(<Attachments items={[AssetDummy.with(1), AssetDummy.with(2), AssetDummy.with(3)]} />);
        cy.get(FlyoutButtonSelector).click();
        cy.get(AttachmentItemSelector).should('have.length', 3);
    });
});
