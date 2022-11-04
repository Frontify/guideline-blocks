/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { TooltipContent } from './TooltipContent';

const TooltipContentSelector = '[data-test-id="tooltip-content"]';

const COLOR_NAME = 'Color Name';
const COLOR_VALUE = '#ff0000';
const STATUS_IDLE_MESSAGE = 'Click to copy.';
const STATUS_SUCCESS_MESSAGE = 'Copied!';
const STATUS_ERROR_MESSAGE = 'Error copying. Try again.';

describe('TooltipContent component', () => {
    it('renders a tooltip content component with idle status', () => {
        mount(<TooltipContent colorName={COLOR_NAME} colorValue={COLOR_VALUE} status="idle" />);

        cy.get(TooltipContentSelector).contains(COLOR_NAME);
        cy.get(TooltipContentSelector).contains(COLOR_VALUE);
        cy.get(TooltipContentSelector).contains(STATUS_IDLE_MESSAGE);
    });

    it('renders a tooltip content component with success status', () => {
        mount(<TooltipContent colorName={COLOR_NAME} colorValue={COLOR_VALUE} status="success" />);

        cy.get(TooltipContentSelector).contains(COLOR_NAME);
        cy.get(TooltipContentSelector).contains(COLOR_VALUE);
        cy.get(TooltipContentSelector).contains(STATUS_SUCCESS_MESSAGE);
    });

    it('renders a tooltip content component with error status', () => {
        mount(<TooltipContent colorName={COLOR_NAME} colorValue={COLOR_VALUE} status="error" />);

        cy.get(TooltipContentSelector).contains(COLOR_NAME);
        cy.get(TooltipContentSelector).contains(COLOR_VALUE);
        cy.get(TooltipContentSelector).contains(STATUS_ERROR_MESSAGE);
    });
});
