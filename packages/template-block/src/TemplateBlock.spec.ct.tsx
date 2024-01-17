/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react';
import { AssetDummy, TemplateDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { TemplateBlock } from './TemplateBlock';
import { BorderStyle, Padding, Radius, toRgbaString } from '@frontify/guideline-blocks-settings';
import {
    AnchoringType,
    PreviewDisplayType,
    PreviewHeightType,
    TextPositioningType,
    paddingStyleMap,
    previewHeightValues,
} from './types';

const TEMPLATE_BLOCK_CONTAINER_SELECTOR = '[data-test-id="template-block-container"]';
const TEMPLATE_BLOCK_SELECTOR = '[data-test-id="template-block-card"]';
const TEMPLATE_BLOCK_CONTENT_SELECTOR = '[data-test-id="template-block-content"]';
const TEMPLATE_PREVIEW_SELECTOR = '[data-test-id="template-block-preview-img"]';
const TEMPLATE_PREVIEW_WRAPPER_SELECTOR = '[data-test-id="template-block-preview-wrapper"]';
const TEMPLATE_TITLE_SELECTOR = '[data-editor-id="template-block-title"]';
const TEMPLATE_DESCRIPTION_SELECTOR = '[data-editor-id="template-block-description"]';
const TEMPLATE_PAGE_COUNT_SELECTOR = '[data-test-id="template-block-page-count"]';
const TEMPLATE_NEW_PUBLICATION_SELECTOR = '[data-test-id="template-block-new-publication-btn"]';
const NEW_PUBLICATION_BUTTON_RTE_SELECTOR = '[data-editor-id="template-block-new-publication-button-text"]';

const TEMPLATE_ID = 13;
const ASSET_ID = 35;
const PREVIEW_CUSTOM_SETTING_ID = 'previewCustom';
const PREVIEW_MODE_NONE = 'none';
const PREVIEW_MODE_CUSTOM = 'custom';
const PREVIEW_MODE_TEMPLATE = 'template';
const COLOR_RED = { red: 255, green: 0, blue: 0 };

describe('Template Block', () => {
    it('should render an empty slate if no template provided', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock);

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTAINER_SELECTOR).should('exist');
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('not.exist');
    });

    it('should render a block if template provided', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('exist');
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('exist');
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('exist');
        cy.get(TEMPLATE_NEW_PUBLICATION_SELECTOR).should('exist');
    });

    it('should render a block if template provided and block is in an edit mode', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTAINER_SELECTOR).should('exist');
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('exist');
        cy.get(TEMPLATE_NEW_PUBLICATION_SELECTOR).should('exist');
        cy.get(TEMPLATE_NEW_PUBLICATION_SELECTOR).should('be.disabled');
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('exist');
    });

    it('should render title and description RTEs if block in edit mode', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_TITLE_SELECTOR).should('exist');
        cy.get(TEMPLATE_DESCRIPTION_SELECTOR).should('exist');
    });

    it('should not render page count if the setting is disabled', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            blockTemplates: {
                template: [templateDummy],
            },
            blockSettings: {
                hasPageCount: false,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('not.exist');
    });

    it('should not render page count in edit mode if the setting is disabled', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasPageCount: false,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('not.exist');
    });

    it('should render page count "0" in edit mode if no template is selected', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PAGE_COUNT_SELECTOR).should('have.text', '0 pages');
    });

    it('should not render preview if preview is set to none', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            blockSettings: {
                preview: PREVIEW_MODE_NONE,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('not.exist');
    });

    it('should render a custom preview image if preview mode is set to custom', () => {
        const asset = AssetDummy.with(ASSET_ID);
        const expectedPreviewUrl = asset.previewUrl;
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                preview: PREVIEW_MODE_CUSTOM,
            },
            blockAssets: {
                [PREVIEW_CUSTOM_SETTING_ID]: [asset],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('have.attr', 'src', expectedPreviewUrl);
    });

    it("should render a template's preview if preview mode is set to template", () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const expectedPreviewUrl = templateDummy.previewUrl;
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockTemplates: {
                template: [templateDummy],
            },
            blockSettings: {
                preview: PREVIEW_MODE_TEMPLATE,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('have.attr', 'src', expectedPreviewUrl);
    });

    it('should render a new publication button with RTE in edit mode', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(NEW_PUBLICATION_BUTTON_RTE_SELECTOR).should('exist');
    });

    it('should render block card with no padding', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                paddingChoice_blockCard: Padding.None,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'padding', '0px');
    });

    it('should render block card with a small padding', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: true,
                paddingChoice_blockCard: Padding.Small,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'padding', paddingStyleMap[Padding.Small]);
    });

    it('should render block card with a medium padding', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: true,
                paddingChoice_blockCard: Padding.Medium,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'padding', paddingStyleMap[Padding.Medium]);
    });

    it('should render block card with a large padding', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: true,
                paddingChoice_blockCard: Padding.Large,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'padding', paddingStyleMap[Padding.Large]);
    });

    it('should render block content with a flex direction column when text positioning is bottom', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Bottom,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'flexDirection', 'column');
    });

    it('should render block content with a flex direction column-reverse when text positioning is top', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Top,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'flexDirection', 'column-reverse');
    });

    it('should render block content with a flex direction row for xl viewport when text positioning is right', () => {
        cy.viewport(1280, 800);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Right,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'flexDirection', 'row');
    });

    it('should render block content with a flex direction row-reverse for xl viewport when text positioning is left', () => {
        cy.viewport(1280, 800);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'flexDirection', 'row-reverse');
    });

    it('should render block text with a top anchoring', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
                textAnchoringVertical: AnchoringType.Start,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'alignItems', 'start');
    });

    it('should render block text with a middle anchoring', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
                textAnchoringVertical: AnchoringType.Center,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'alignItems', 'center');
    });

    it('should render block text with a bottom anchoring', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
                textAnchoringVertical: AnchoringType.End,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_CONTENT_SELECTOR).should('have.css', 'alignItems', 'end');
    });

    it('should render preview with a small height', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                preview: PREVIEW_MODE_TEMPLATE,
                previewHeightSimple: PreviewHeightType.Small,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_WRAPPER_SELECTOR).should(
            'have.css',
            'height',
            previewHeightValues[PreviewHeightType.Small],
        );
    });

    it('should render preview with a medium height', () => {
        const asset = AssetDummy.with(ASSET_ID);

        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                preview: PREVIEW_MODE_CUSTOM,
                previewHeightSimple: PreviewHeightType.Medium,
            },
            blockTemplates: {
                template: [templateDummy],
            },
            blockAssets: {
                [PREVIEW_CUSTOM_SETTING_ID]: [asset],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_WRAPPER_SELECTOR).should(
            'have.css',
            'height',
            previewHeightValues[PreviewHeightType.Medium],
        );
    });

    it('should render preview with a large height', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                previewHeightSimple: PreviewHeightType.Large,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_WRAPPER_SELECTOR).should(
            'have.css',
            'height',
            previewHeightValues[PreviewHeightType.Large],
        );
    });

    it('should fit the preview', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                previewHeightSimple: PreviewHeightType.Small,
                previewDisplay: PreviewDisplayType.Fit,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('have.class', 'tw-object-contain');
    });

    it('should fill the preview', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                previewHeightSimple: PreviewHeightType.Small,
                previewDisplay: PreviewDisplayType.Fill,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_SELECTOR).should('have.class', 'tw-object-cover');
    });

    it('should render card with a background color', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBackground: true,
                backgroundColor: COLOR_RED,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'backgroundColor', 'rgb(255, 0, 0)');
    });

    it('should render card with a custom border', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: true,
                borderWidth_blockCard: '1px',
                borderColor_blockCard: toRgbaString(COLOR_RED),
                borderStyle_blockCard: BorderStyle.Solid,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'border', '1px solid rgb(255, 0, 0)');
    });

    it('should render card with a medium border radius', () => {
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                radiusChoice_blockCard: Radius.Medium,
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_BLOCK_SELECTOR).should('have.css', 'borderRadius', '4px');
    });

    it('should render preview with a background color', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBackgroundTemplatePreview: true,
                backgroundColorTemplatePreview: COLOR_RED,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_WRAPPER_SELECTOR).should('have.css', 'backgroundColor', 'rgb(255, 0, 0)');
    });

    it('should render preview with a custom border', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                hasBorder_templatePreview: true,
                borderWidth_templatePreview: '1px',
                borderColor_templatePreview: COLOR_RED,
                borderStyle_templatePreview: BorderStyle.Solid,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_WRAPPER_SELECTOR).should('have.css', 'border', '1px solid rgb(255, 0, 0)');
    });

    it('should render preview with a medium border radius', () => {
        const templateDummy = TemplateDummy.with(TEMPLATE_ID);
        const [TemplateBlockWithStubs] = withAppBridgeBlockStubs(TemplateBlock, {
            editorState: true,
            blockSettings: {
                radiusChoice_templatePreview: Radius.Medium,
            },
            blockTemplates: {
                template: [templateDummy],
            },
        });

        mount(<TemplateBlockWithStubs />);
        cy.get(TEMPLATE_PREVIEW_WRAPPER_SELECTOR).should('have.css', 'borderRadius', '4px');
    });
});
