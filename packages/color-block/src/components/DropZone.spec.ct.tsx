/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { mount } from 'cypress/react18';
import { ColorDummy } from '@frontify/app-bridge';

import { CardsItem } from './cards/CardsItem';
import { DropZone } from './DropZone';
import { ColorBlockType, ColorSpaceValues } from '../types';

const CardsItemSelector = '[data-test-id="cards-item"]';

describe('DropZone component', () => {
    it('renders DropZone correcly', () => {
        const moveCardStub = cy.stub().as('moveCard');

        const onBlurStub = cy.stub().as('onBlur');
        const onUpdateStub = cy.stub().as('onUpdate');
        const onDeleteStub = cy.stub().as('onDelete');

        const COLOR_SPACES = ['hex', 'rgb', 'variable'];

        const dropZoneProps = {
            treeId: 'test',
            colorBlockType: ColorBlockType.Cards,
            moveCard: moveCardStub,
            isEditing: true,
        };

        const cardsItemProps = {
            color: ColorDummy.red(),
            colorSpaces: COLOR_SPACES as (keyof ColorSpaceValues)[],
            isEditing: true,
            onBlur: onBlurStub,
            onUpdate: onUpdateStub,
            onDelete: onDeleteStub,
        };

        mount(
            <div className="tw-grid tw-gap-4 tw-grid-cols-4">
                <DndProvider backend={HTML5Backend}>
                    <DropZone {...dropZoneProps} index={1}>
                        <div>
                            <CardsItem {...cardsItemProps} />
                        </div>
                    </DropZone>
                    <DropZone {...dropZoneProps} index={2}>
                        <div>
                            <CardsItem {...cardsItemProps} />
                        </div>
                    </DropZone>
                </DndProvider>
            </div>
        );

        cy.get(CardsItemSelector).first().trigger('dragstart', 'bottom');
        cy.get(CardsItemSelector).last().trigger('dragenter', 'right').trigger('dragover');
        cy.get('@moveCard').should('have.been.called');
    });
});
