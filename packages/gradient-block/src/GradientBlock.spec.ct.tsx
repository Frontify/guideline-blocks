/* (c) Copyright Frontify Ltd., all rights reserved. */

import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { mount } from 'cypress/react18';
import { HEIGHT_OF_SQUARE_BADGE } from './constants';
import { GradientBlock } from './GradientBlock';
import {
    HEIGHT_CUSTOM_ID,
    HEIGHT_SIMPLE_ID,
    IS_CUSTOM_HEIGHT_ID,
    IS_CUSTOM_ORIENTATION_ID,
    ORIENTATION_CUSTOM_ID,
    ORIENTATION_SIMPLE_ID,
} from './settings';
import { GradientHeight, GradientOrientation } from './types';

const AddColorButtonSelector = '[data-test-id="add-color-button"]';
const ColorPickerFlyoutSelector = '[role="dialog"]';
const ColorTooltipSelector = '[data-test-id="color-tooltip"]';
const ColorPointsSelector = '[data-test-id="color-points"]';
const ColorPickerForm = '[data-test-id="color-picker-form"]';
const CssValueSelector = '[data-test-id="css-value-display"]';
const CssCopyButtonSelector = '[data-test-id="css-value-display-copy-button"]';
const EditAndDeleteColorBoxSelector = '[data-test-id="edit-and-delete-color-box"]';
const GradientBlockDisplaySelector = '[data-test-id="gradient-block-display"]';
const GradientBlockDividerSelector = '[data-test-id="gradient-block-divider"]';
const SquareBadgesSelector = '[data-test-id="square-badge"]';
const SquareBadgeCheckmark = '[data-test-id="square-badge-checkmark"]';
const SquareBadgeClipboard = '[data-test-id="square-badge-clipboard"]';
const ButtonSelector = '[data-test-id="button"]';
const ColorInputSelector = '[data-test-id="color-input"]';
const ColorPreviewSelector = '[role="dialog"]';
const TriggerSelector = '[data-test-id="trigger"]';
const TextInputSelector = '[data-test-id="text-input"]';
const TextInputErrorSelector = '[data-test-id="error-state-exclamation-mark-icon"]';
const FormControlHelperTextSelector = '[data-test-id="form-control-helper-text"]';

const GradientColor = [
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 0,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        position: 25,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 100,
    },
];

const GradientColorsWithOpacity = [
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 0,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0.5,
        },
        position: 25,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 100,
    },
];

const MultiLevelGradientColors = [
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 0,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        position: 1,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 2,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        position: 3,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 4,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 20,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 21,
    },
    {
        color: {
            red: 255,
            green: 255,
            blue: 255,
            alpha: 1,
        },
        position: 95,
    },
    {
        color: {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1,
        },
        position: 100,
    },
];

const TargetForMultiLevelGradient = [0, 1, 2, 3, 4, 0, 1, 0, 1];

describe('Gradient Block', () => {
    it('renders a gradient block', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 25%, rgb(255, 255, 255) 100%)'
        );
    });

    it('renders three SquareBadges', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColorsWithOpacity,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(SquareBadgesSelector).should('have.length', 3);
        cy.get(SquareBadgesSelector).eq(0).should('contain.text', '#ffffff');
        cy.get(SquareBadgesSelector).eq(1).should('contain.text', '#00000080');
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(0, 0, 0, 0.5) 25%, rgb(255, 255, 255) 100%)'
        );
    });

    it('square badges levels with special colors', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: MultiLevelGradientColors,
            },
        });

        mount(<GradientBlockWithStubs />);

        cy.get(SquareBadgesSelector).each((badge, index) => {
            cy.wrap(badge).should(
                'have.css',
                'top',
                `${TargetForMultiLevelGradient[index] * HEIGHT_OF_SQUARE_BADGE}px`
            );
        });
    });

    it('renders a CSSValue display', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                displayCss: true,
            },
        });

        mount(<GradientBlockWithStubs />);

        cy.get(CssValueSelector).should('exist');
    });

    it('renders a CSSValue display in view mode click on copy button', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                displayCss: true,
            },
        });

        mount(<GradientBlockWithStubs />);

        cy.get(CssCopyButtonSelector).click({ force: true });
        cy.get(CssCopyButtonSelector).should('contain', 'Copied');
    });

    it('renders three color points in edit mode', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(ColorPointsSelector).should('have.length', 3);
    });

    it('click on square badge icon changes', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(SquareBadgesSelector).first().get(SquareBadgeClipboard).should('exist');
        cy.get(SquareBadgesSelector).first().realClick();
        cy.get(SquareBadgesSelector).first().get(SquareBadgeCheckmark).should('exist');
    });

    it('add new color button shows on hover', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDividerSelector).realHover();
        cy.get(AddColorButtonSelector).should('exist');
    });

    it('add new color adds point on divider', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDividerSelector).realHover();
        cy.get(AddColorButtonSelector).realClick();
        cy.get(ColorPickerFlyoutSelector).should('exist');
        cy.get(ColorPickerForm).find(TriggerSelector).realClick();
        cy.get('[data-test-id="brand-color"]').first().click();
        cy.get(ColorPickerFlyoutSelector).find(ButtonSelector).last().realClick();
        cy.get(ColorPickerFlyoutSelector).find(ButtonSelector).last().realClick();
        cy.get(ColorPointsSelector).should('have.length', 4);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 25%, rgb(255, 0, 0) 50%, rgb(255, 255, 255) 100%)'
        );
    });

    it('color point on hover shows tooltip', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(ColorPointsSelector).first().realHover();
        cy.get(ColorTooltipSelector).should('exist');
        cy.get(EditAndDeleteColorBoxSelector).should('exist');
    });

    it('edit an existing color change to blue', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(ColorPointsSelector).eq(1).realHover();
        cy.get(EditAndDeleteColorBoxSelector).eq(1).find('button').first().realClick();
        cy.get(ColorPickerFlyoutSelector).should('exist');
        cy.get(ColorPickerForm).find(TriggerSelector).realClick();
        cy.get('[data-test-id="fondue-segmented-controls-item-text"]').last().realClick();
        cy.get(ColorInputSelector).first().find('input').clear().type('#0000ff').blur();
        cy.get(ColorPreviewSelector).parent().find(ButtonSelector).last().realClick();
        cy.get(ColorPickerFlyoutSelector).find(ButtonSelector).realClick();

        cy.get(ColorPointsSelector).should('have.length', 3);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(0, 0, 255) 25%, rgb(255, 255, 255) 100%)'
        );
    });

    it('delete an existing color', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(ColorPointsSelector).eq(1).realHover();
        cy.get(EditAndDeleteColorBoxSelector).eq(1).find('button').last().realClick();
        cy.get(ColorPointsSelector).should('have.length', 2);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)'
        );
    });

    it('gradient layout size small', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [HEIGHT_SIMPLE_ID]: GradientHeight.Small,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should('have.css', 'height', '48px');
    });

    it('gradient layout size medium', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [HEIGHT_SIMPLE_ID]: GradientHeight.Medium,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should('have.css', 'height', '72px');
    });

    it('gradient layout size large', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [HEIGHT_SIMPLE_ID]: GradientHeight.Large,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should('have.css', 'height', '96px');
    });

    it('gradient layout size custom', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [IS_CUSTOM_HEIGHT_ID]: true,
                [HEIGHT_CUSTOM_ID]: 300,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should('have.css', 'height', '300px');
    });

    it('gradient orientation horizontal', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [ORIENTATION_SIMPLE_ID]: GradientOrientation.Horizontal,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 25%, rgb(255, 255, 255) 100%)'
        );
    });

    it('gradient orientation vertical', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [ORIENTATION_SIMPLE_ID]: GradientOrientation.Vertical,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 25%, rgb(255, 255, 255) 100%)'
        );

        cy.get(SquareBadgesSelector).each((badge, index) => {
            cy.wrap(badge).should('have.css', 'left', '0px');
            cy.wrap(badge).should('have.css', 'top', `${index * HEIGHT_OF_SQUARE_BADGE}px`);
        });
    });

    it('gradient orientation custom', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: GradientColor,
                [IS_CUSTOM_ORIENTATION_ID]: true,
                [ORIENTATION_CUSTOM_ID]: 45,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDisplaySelector).should(
            'have.css',
            'background-image',
            'linear-gradient(45deg, rgb(255, 255, 255) 0%, rgb(0, 0, 0) 25%, rgb(255, 255, 255) 100%)'
        );
        cy.get(SquareBadgesSelector).each((badge, index) => {
            cy.wrap(badge).should('have.css', 'left', '0px');
            cy.wrap(badge).should('have.css', 'top', `${index * HEIGHT_OF_SQUARE_BADGE}px`);
        });
    });

    it('should display the helper text and input form with exclamation mark if the position is already taken', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            editorState: true,
            blockSettings: {
                gradientColors: GradientColor,
            },
        });

        mount(<GradientBlockWithStubs />);
        cy.get(GradientBlockDividerSelector).realHover();
        cy.get(AddColorButtonSelector).realClick();
        cy.get(ColorPickerForm).find(TextInputSelector).clear().type('0');
        cy.get(FormControlHelperTextSelector).should('exist');
        cy.get(TextInputErrorSelector).should('exist');
    });

    it('square badge should not overlay the gradient block if just one color is present', () => {
        const [GradientBlockWithStubs] = withAppBridgeBlockStubs(GradientBlock, {
            blockSettings: {
                gradientColors: [
                    {
                        color: {
                            red: 255,
                            green: 255,
                            blue: 255,
                            alpha: 1,
                        },
                        position: 0,
                    },
                ],
            },
        });
        mount(<GradientBlockWithStubs />);
        cy.get(SquareBadgesSelector).should('have.length', 1);
        cy.get(SquareBadgesSelector).first().should('have.css', 'top', '0px');
    });
});
