/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { mount } from 'cypress/react';
import { FrontifyColorDummy } from '@frontify/app-bridge';

import { CardsItem } from './cards/CardsItem';
import { DropZone } from './DropZone';
import { ColorBlockType, ColorSpaceInputValues } from '../types';

const CardsItemSelector = '[data-test-id="cards-item"]';

describe('DropZone component', () => {
    it('renders DropZone correcly', () => {
        const moveCardStub = cy.stub().as('moveCard');

        const onBlurStub = cy.stub().as('onBlur');
        const onUpdateStub = cy.stub().as('onUpdate');
        const onDeleteStub = cy.stub().as('onDelete');

        const COLORSPACES = ['hex', 'rgb', 'variable'];

        mount(
            <div className="tw-grid tw-gap-4 tw-grid-cols-4">
                <DndProvider backend={HTML5Backend}>
                    <DropZone
                        treeId="test"
                        colorBlockType={ColorBlockType.Cards}
                        index={1}
                        moveCard={moveCardStub}
                        isEditing
                    >
                        <div>
                            <CardsItem
                                color={FrontifyColorDummy.red()}
                                colorSpaces={COLORSPACES as (keyof ColorSpaceInputValues)[]}
                                isEditing
                                onBlur={onBlurStub}
                                onUpdate={onUpdateStub}
                                onDelete={onDeleteStub}
                            />
                        </div>
                    </DropZone>
                    <DropZone
                        treeId="test"
                        colorBlockType={ColorBlockType.Cards}
                        index={2}
                        moveCard={moveCardStub}
                        isEditing
                    >
                        <div>
                            <CardsItem
                                color={FrontifyColorDummy.red()}
                                colorSpaces={COLORSPACES as (keyof ColorSpaceInputValues)[]}
                                isEditing
                                onBlur={onBlurStub}
                                onUpdate={onUpdateStub}
                                onDelete={onDeleteStub}
                            />
                        </div>
                    </DropZone>
                </DndProvider>
            </div>
        );

        cy.get(CardsItemSelector).first().trigger('dragstart');
        cy.get(CardsItemSelector).last().trigger('dragenter', 'right').trigger('dragover');
        cy.get('@moveCard').should('have.been.called');
    });
});
