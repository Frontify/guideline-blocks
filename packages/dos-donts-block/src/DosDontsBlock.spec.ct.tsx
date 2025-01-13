/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE, DosDontsBlock, DosDontsBlockWrapper } from './DosDontsBlock';
import { BlockMode, DoDontSpacing, DoDontStyle, DoDontType, ItemIconChoice } from './types';
import './__tests__/themes.css';

const DosDontsBlockSelector = '[data-test-id="dos-donts-block"]';
const DosDontsHeading = '[data-test-id="dos-donts-heading"]';
const DosDontsContent = '[data-test-id="dos-donts-content"]';
const DosDontsIcon = '[data-test-id="dos-donts-icon"]';
const FLOATING_LINK_BUTTON = '[data-plugin-id="a"]';
const FLOATING_BUTTON_BUTTON = '[data-plugin-id="button"]';
const INTERNAL_LINK_SELECTOR = '[data-test-id="internal-link-selector"]';
const IMAGE_SELECTOR = '[data-test-id="do-dont-image"]';
const DND_ADD_BUTTONS = '[data-test-id="dos-donts-block-add-buttons"]';

describe("Dos & Don'ts Block", () => {
    it('renders a dos donts block', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {});

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).should('exist');
    });

    it('renders an dos donts block in view mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {});

        mount(<DosDontsBlockWithStubs />);
        cy.get('[data-test-id="rte-content-html"]').should('not.exist');
        cy.get('[data-test-id="rich-text-editor"]').should('not.exist');
    });

    it('renders an empty dos donts block in edit mode', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                style: DoDontStyle.Icons,
                dontIconChoice: ItemIconChoice.CHECKMARK,
                doIconChoice: ItemIconChoice.CHECKMARK,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).find('textarea[placeholder="Add a title"]').should('exist');
        cy.get(DosDontsBlockSelector).find('[data-slate-placeholder]').should('exist').contains('Add a description');
    });

    it('renders a dos donts block with the underline style', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                style: DoDontStyle.Underline,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsIcon).should('not.exist');
        cy.get(DosDontsHeading).next('hr').should('exist');
    });

    it('renders a dos donts block with the correct layout', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 3,
                isCustomColumnGutter: true,
                customColumnGutterValue: '20px',
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsBlockSelector).should('have.class', '@md:tw-grid-cols-3');
        cy.get(DosDontsBlockSelector).should('have.css', 'column-gap', '20px');
    });

    it('renders a dos donts block with the correct colors', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            blockSettings: {
                columns: 2,
                hasCustomDoColor: true,
                hasCustomDontColor: true,
                doColor: DO_COLOR_DEFAULT_VALUE,
                dontColor: DONT_COLOR_DEFAULT_VALUE,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsHeading).first().should('have.css', 'color', 'rgb(0, 200, 165)');
        cy.get(DosDontsHeading).eq(1).should('have.css', 'color', 'rgb(255, 55, 90)');
    });

    it('renders alt text for images', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlockWrapper, {
            blockSettings: {
                mode: BlockMode.TEXT_AND_IMAGE,
                columns: 2,
                hasCustomDoColor: true,
                hasCustomDontColor: true,
                doColor: DO_COLOR_DEFAULT_VALUE,
                dontColor: DONT_COLOR_DEFAULT_VALUE,
                items: [
                    {
                        id: 1,
                        body: 'Test',
                        title: 'Test',
                        alt: 'Alt text',
                        imageId: 1,
                        type: DoDontType.Do,
                    },
                ],
            },
            blockAssets: { itemImages: [AssetDummy.with(1)] },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(IMAGE_SELECTOR).should('exist');
        cy.get(IMAGE_SELECTOR).should('have.attr', 'alt', 'Alt text');
    });

    it('writes content to a dos donts block', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columnGutterChoice: DoDontSpacing.Large,
                rowGutterChoice: DoDontSpacing.Large,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsHeading).first().find('textarea').type('Do this');
        cy.get(DosDontsHeading).first().find('textarea').contains('Do this');
        cy.get(DosDontsContent).first().find('[contenteditable=true]').click().should('be.focused');
        cy.get(DosDontsContent)
            .first()
            .find('[contenteditable=true]')
            .click()
            .type('This is an example do description.');
        cy.get(DosDontsContent).first().find('[contenteditable=true]').contains('This is an example do description.');
        cy.get(DosDontsHeading).eq(1).find('textarea').type('Dont do this');
        cy.get(DosDontsHeading).eq(1).find('textarea').contains('Dont do this');
        cy.get(DosDontsContent).eq(1).find('[contenteditable=true]').click();
        cy.get(DosDontsContent).eq(1).find('[contenteditable=true]').click().should('be.focused');
        cy.get(DosDontsContent)
            .eq(1)
            .find('[contenteditable=true]')
            .click()
            .type('This is an example dont description.');
        cy.get(DosDontsContent).eq(1).find('[contenteditable=true]').contains('This is an example dont description.');
    });

    it('has an internal link chooser in the RTE', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columnGutterChoice: DoDontSpacing.Large,
                rowGutterChoice: DoDontSpacing.Large,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsContent)
            .first()
            .find('[contenteditable=true]')
            .dblclick()
            .type('This is an example do description.{selectall}', { force: true });

        cy.get(FLOATING_LINK_BUTTON).should('exist').click();
        cy.get(INTERNAL_LINK_SELECTOR).should('exist');
    });

    it('has an internal link chooser for buttons in the RTE', () => {
        const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
            editorState: true,
            blockSettings: {
                columnGutterChoice: DoDontSpacing.Large,
                rowGutterChoice: DoDontSpacing.Large,
            },
        });

        mount(<DosDontsBlockWithStubs />);
        cy.get(DosDontsContent)
            .first()
            .find('[contenteditable=true]')
            .dblclick()
            .type('This is an example do description.{selectall}', { force: true });

        cy.get(FLOATING_BUTTON_BUTTON).should('exist').click();
        cy.get(INTERNAL_LINK_SELECTOR).should('exist');
    });

    describe('Add buttons', () => {
        it('should stack on top of each other on containers below @sm(440px) breakpoint', () => {
            const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
                editorState: true,
                blockSettings: {
                    style: DoDontStyle.Icons,
                    dontIconChoice: ItemIconChoice.CHECKMARK,
                    doIconChoice: ItemIconChoice.CHECKMARK,
                },
            });

            mount(
                <div className="tw-w-[150px]">
                    <DosDontsBlockWithStubs />
                </div>
            );

            cy.get(DND_ADD_BUTTONS).should('have.css', 'flex-direction', 'column');
        });

        it('should be rendered side by side on containers larger than @sm(440px) breakpoint', () => {
            const [DosDontsBlockWithStubs] = withAppBridgeBlockStubs(DosDontsBlock, {
                editorState: true,
                blockSettings: {
                    style: DoDontStyle.Icons,
                    dontIconChoice: ItemIconChoice.CHECKMARK,
                    doIconChoice: ItemIconChoice.CHECKMARK,
                },
            });

            mount(
                <div className="tw-w-[500px]">
                    <DosDontsBlockWithStubs />
                </div>
            );

            cy.get(DND_ADD_BUTTONS).should('have.css', 'flex-direction', 'row');
        });
    });
});
