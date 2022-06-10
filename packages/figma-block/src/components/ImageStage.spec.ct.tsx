/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from '@cypress/react';
import { ImageStage } from './ImageStage';

const IMAGE_STAGE_SELECTOR = '[id="image-stage"]';
// const ICON_ZOOM_OUT_SELECTOR = '[name="IconMinus"]';
// const ICON_REJECT_SELECTOR = '[name="IconReject"]';
// const ICON_EXPAND_SELECTOR = '[name="IconExpand"]';
const CUSTOM_HEIGHT = '100px';

const ImageStageDivBlock = () => <div id="image-stage" style={{ height: 100, width: 200 }}></div>;

describe('ImageStage', () => {
    it('return the correct width and height', () => {
        mount(<ImageStageDivBlock />);

        cy.get(IMAGE_STAGE_SELECTOR).then((element) => {
            const imageStage = new ImageStage(element.get(0) as HTMLDivElement, CUSTOM_HEIGHT);

            expect(imageStage.height).to.equal(100);
            expect(imageStage.width).to.equal(200);
        });
    });

    it('return the correct aspectRatio', () => {
        mount(<ImageStageDivBlock />);

        cy.get(IMAGE_STAGE_SELECTOR).then((element) => {
            const imageStage = new ImageStage(element.get(0) as HTMLDivElement, CUSTOM_HEIGHT);
            expect(imageStage.aspectRatio()).to.equal(2);
        });
    });

    it('correct alters the height', () => {
        mount(<ImageStageDivBlock />);

        cy.get(IMAGE_STAGE_SELECTOR).then((element) => {
            const imageStage = new ImageStage(element.get(0) as HTMLDivElement, CUSTOM_HEIGHT);
            imageStage.alterHeight('300px');
            expect(imageStage.height).to.equal(300);
        });
    });
});
