/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';

import { BlockContainerStub } from '../../tests/BlockContainerStub';

const IMAGE_CONTAINER_SELECTOR = '[id="image-container"]';
const IMAGE_STAGE_SELECTOR = '[id="image-stage"]';
const IMAGE_ELEMENT = '[id="image-element"]';

describe('BitmapContainerOperator', () => {
    it('fits element / image with 400px height in the center', () => {
        mount(<BlockContainerStub height="400px" />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_ELEMENT)
                .wait(10)
                .then((imageElement) => {
                    const stageClientRect = stageElement[0].getBoundingClientRect();
                    const imageClientRect = imageElement[0].getBoundingClientRect();

                    const isInTheMiddle =
                        (stageClientRect.width - imageClientRect.width) / 2 === imageElement?.offset()?.left;

                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(isInTheMiddle).to.be.true;
                    return null;
                });
            return null;
        });
    });

    it('fits element with 700px height in the center', () => {
        mount(<BlockContainerStub height="700px" />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_CONTAINER_SELECTOR)
                .wait(10)
                .then((containerElement) => {
                    const stageClientRect = stageElement[0].getBoundingClientRect();
                    const containerClientRect = containerElement[0].getBoundingClientRect();

                    const isInTheMiddle =
                        `${(stageClientRect.width - containerClientRect.width) / 2}px` ===
                        containerElement[0].style.left;
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(isInTheMiddle).to.be.true;
                    return null;
                });
            return null;
        });
    });

    it('render element with Padding 0.2 (in percentages)', () => {
        mount(<BlockContainerStub height="500px" padding={0.2} />);

        cy.get(IMAGE_STAGE_SELECTOR).then((stageElement) => {
            cy.get(IMAGE_CONTAINER_SELECTOR)
                .wait(10)
                .then((containerElement) => {
                    const stageClientRect = stageElement[0].getBoundingClientRect();
                    const containerClientRect = containerElement[0].getBoundingClientRect();

                    const isInTheMiddle =
                        `${(stageClientRect.width - containerClientRect.width) / 2}px` ===
                        containerElement[0].style.left;
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    expect(isInTheMiddle).to.be.true;
                    return null;
                });
            return null;
        });
    });
});
