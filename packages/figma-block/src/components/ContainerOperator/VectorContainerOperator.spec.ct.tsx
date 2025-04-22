/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_SELECTOR = '[id="image-container"]';
const IMAGE_STAGE_SELECTOR = '[id="image-stage"]';

describe('VectorContainerOperator', () => {
    it('fits element with 400px height in the center', () => {
        mount(<BlockContainerStub height="400px" />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_CONTAINER_SELECTOR)
                .wait(10)
                .then((containerElement) => {
                    const stageClientRect = stageElement[0].getBoundingClientRect();
                    const containerClientRect = containerElement[0].getBoundingClientRect();

                    const isInTheMiddle =
                        `${(stageClientRect.width - containerClientRect.width) / 2}px` ===
                        containerElement[0].style.left;
                    expect(isInTheMiddle).to.be.true;
                });
        });
    });

    it('moves image 100px left', () => {
        mount(<BlockContainerStub height="400px" />);

        const mousePositionOnScreen = { pageX: 300, pageY: 100 };
        cy.get(IMAGE_CONTAINER_SELECTOR)
            .trigger('mousedown')
            .trigger('mousemove', { which: 1, ...mousePositionOnScreen })
            .trigger('mouseup')
            .then((containerElement) => {
                const containerClientRect = containerElement[0].getBoundingClientRect();
                const elementPositionAfterMove = {
                    left: `${mousePositionOnScreen.pageX - containerClientRect.width / 2}px`,
                    top: `${mousePositionOnScreen.pageY - containerClientRect.height / 2}px`,
                };
                expect(containerElement[0].style.left).to.equal(elementPositionAfterMove.left);
                expect(containerElement[0].style.top).to.equal(elementPositionAfterMove.top);
            });
    });
});
