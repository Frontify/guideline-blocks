/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { DrawFullScreenActionButton, DrawZoomInOutButtons } from './ImageStageControls';

const ICON_ZOOM_IN_SELECTOR = '[name="IconPlus16"]';
const ICON_ZOOM_OUT_SELECTOR = '[name="IconMinus16"]';
const ICON_REJECT_SELECTOR = '[name="IconCross20"]';
const ICON_EXPAND_SELECTOR = '[name="IconArrowExpand20"]';

describe('Image Control Buttons', () => {
    describe('DrawFullScreenActionButton', () => {
        const onClick = () => true;

        it('renders button with icon expand', () => {
            mount(<DrawFullScreenActionButton onClick={onClick} />);
            cy.get(ICON_EXPAND_SELECTOR).should('exist');
        });

        it('renders button with icon reject', () => {
            mount(<DrawFullScreenActionButton isFullScreen onClick={onClick} />);
            cy.get(ICON_REJECT_SELECTOR).should('exist');
        });
    });

    describe('DrawZoomInOutButtons', () => {
        it('renders Zoom In and Out buttons', () => {
            const onClickZoomIn = cy.stub().as('onClickZoomIn');
            const onClickZoomOut = cy.stub().as('onClickZoomOut');

            mount(<DrawZoomInOutButtons onClickZoomIn={onClickZoomIn} onClickZoomOut={onClickZoomOut} />);
            cy.get(ICON_ZOOM_IN_SELECTOR).should('exist');
            cy.get(ICON_ZOOM_OUT_SELECTOR).should('exist');
        });

        it('test the onClick action', () => {
            const onClickZoomIn = cy.stub().as('onClickZoomIn');
            const onClickZoomOut = cy.stub().as('onClickZoomOut');

            mount(<DrawZoomInOutButtons onClickZoomIn={onClickZoomIn} onClickZoomOut={onClickZoomOut} />);
            cy.get('button').eq(0).should('exist').click({ force: true });
            cy.get('button').eq(1).should('exist').click({ force: true });

            cy.get('@onClickZoomIn').should('have.been.calledOnce');
            cy.get('@onClickZoomOut').should('have.been.calledOnce');
        });
    });
});
