/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_SELECTOR = '[id="image-container"]';
const IMAGE_STAGE_SELECTOR = '[id="image-stage"]';

describe('BitmapContainerOperator', () => {
    it('fits element with 400px height in the center', () => {
        mount(<BlockContainerStub height="400px" />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_CONTAINER_SELECTOR).then((containerElement) => {
                const stageClientRect = stageElement[0].getBoundingClientRect();
                const containerClientRect = containerElement[0].getBoundingClientRect();

                const isInTheMiddle =
                    `${(stageClientRect.width - containerClientRect.width) / 2}px` === containerElement[0].style.left;
                expect(isInTheMiddle).to.be.true;
            });
        });
    });

    it('fits element with 700px height in the center', () => {
        mount(<BlockContainerStub height="700px" />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_CONTAINER_SELECTOR).then((containerElement) => {
                const stageClientRect = stageElement[0].getBoundingClientRect();
                const containerClientRect = containerElement[0].getBoundingClientRect();

                const isInTheMiddle =
                    `${(stageClientRect.width - containerClientRect.width) / 2}px` === containerElement[0].style.left;
                expect(isInTheMiddle).to.be.true;
            });
        });
    });

    it('render element with Padding 0.2 (in percentages)', () => {
        mount(<BlockContainerStub height="500px" padding={0.2} />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_CONTAINER_SELECTOR).then((containerElement) => {
                const stageClientRect = stageElement[0].getBoundingClientRect();
                const containerClientRect = containerElement[0].getBoundingClientRect();

                const isInTheMiddle =
                    `${(stageClientRect.width - containerClientRect.width) / 2}px` === containerElement[0].style.left;
                expect(isInTheMiddle).to.be.true;
            });
        });
    });
});
