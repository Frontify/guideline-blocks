/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetDummy, TemplateDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { BorderStyle, Padding, Radius, toRgbaString } from '@frontify/guideline-blocks-settings';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TemplateBlock } from './TemplateBlock';
import {
    AnchoringType,
    PreviewDisplayType,
    PreviewHeightType,
    TemplateEditing,
    TextPositioningType,
    TextRatioType,
    horizontalAlignmentToCtaSelfAlign,
    horizontalAlignmentToTextAlign,
    paddingStyleMap,
    previewDisplayValues,
    previewHeightValues,
    textPositioningToContentFlexDirection,
    textRatioToInverseFlexBasis,
    verticalAlignmentToItemAlign,
} from './types';

const CONTAINER_TEST_ID = 'container';
const CARD_TEST_ID = 'card';
const CONTENT_TEST_ID = 'content';
const PREVIEW_WRAPPER_TEST_ID = 'preview-wrapper';
const PREVIEW_TEST_ID = 'preview';
const PREVIEW_IMAGE_TEST_ID = 'preview-img';
const TEXT_CTA_WRAPPER_TEST_ID = 'text-cta-wrapper';
const TEXT_TEST_ID = 'text';
const CTA_TEST_ID = 'cta';
const PAGE_COUNT_TEST_ID = 'page-count';
const CTA_BUTTON_TEST_ID = 'cta-button';
const TITLE_TEST_ID = 'title';
const DESCRIPTION_TEST_ID = 'description';
const RICH_TEXT_EDITOR_CONTAINER_TEST_ID = 'rich-text-editor-container';

const TEMPLATE_ID = 13;
const ASSET_ID = 35;
const PREVIEW_CUSTOM_SETTING_ID = 'previewCustom';
const PREVIEW_MODE_NONE = 'none';
const PREVIEW_MODE_CUSTOM = 'custom';
const PREVIEW_MODE_TEMPLATE = 'template';
const COLOR_RED = { red: 255, green: 0, blue: 0 };

const getTemplateDummyWithPages = () => {
    const templateDummy = TemplateDummy.with(TEMPLATE_ID);
    templateDummy.name = 'Template with two pages';
    templateDummy.pages = [
        {
            previewUrl: 'url-1',
            width: 1920,
            height: 1080,
        },
        {
            previewUrl: 'url-2',
            width: 1080,
            height: 1920,
        },
    ];
    return templateDummy;
};

const renderTemplateBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [TemplateBlockWithStubs, appBridge] = withAppBridgeBlockStubs(TemplateBlock, appBridgeProps);
    const utils = render(<TemplateBlockWithStubs />);
    return { ...utils, appBridge };
};

describe('Template Block', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should render an empty slate if no template provided', () => {
        renderTemplateBlock();
        expect(screen.getByTestId(CONTAINER_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(CARD_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render a block if template provided', async () => {
        renderTemplateBlock({
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(CARD_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(PREVIEW_IMAGE_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(PAGE_COUNT_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CTA_BUTTON_TEST_ID)).toBeInTheDocument();
    });

    it('should not render a block if the user is not authenticated', () => {
        renderTemplateBlock({
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
            isAuthenticated: false,
        });
        expect(screen.getByTestId(CONTAINER_TEST_ID)).toBeInTheDocument();
        expect(screen.queryByTestId(CARD_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render a block if template provided and block is in edit mode', () => {
        renderTemplateBlock({
            editorState: true,
        });
        expect(screen.getByTestId(CONTAINER_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CARD_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CTA_BUTTON_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CTA_BUTTON_TEST_ID)).toBeDisabled();
        expect(screen.getByTestId(PAGE_COUNT_TEST_ID)).toBeInTheDocument();
    });

    it('should render title and description RTEs if the block is in edit mode', async () => {
        renderTemplateBlock({
            editorState: true,
        });
        await waitFor(() => {
            expect(
                within(screen.getByTestId(TITLE_TEST_ID)).getByTestId(RICH_TEXT_EDITOR_CONTAINER_TEST_ID)
            ).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                within(screen.getByTestId(DESCRIPTION_TEST_ID)).getByTestId(RICH_TEXT_EDITOR_CONTAINER_TEST_ID)
            ).toBeInTheDocument();
        });
    });

    it('should not render page count if the setting is disabled', () => {
        renderTemplateBlock({
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
            blockSettings: {
                hasPageCount: false,
            },
        });
        expect(screen.queryByTestId(PAGE_COUNT_TEST_ID)).not.toBeInTheDocument();
    });

    it('should not render page count in edit mode if the setting is disabled', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasPageCount: false,
            },
        });
        expect(screen.queryByTestId(PAGE_COUNT_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render page count "0" in edit mode if no template is selected', () => {
        renderTemplateBlock({
            editorState: true,
        });
        expect(screen.getByTestId(PAGE_COUNT_TEST_ID)).toHaveTextContent('0 pages');
    });

    it("should render a template's preview if preview mode is set to template", async () => {
        const templateDummy = getTemplateDummyWithPages();
        const expectedPreviewUrl = templateDummy.previewUrl;
        renderTemplateBlock({
            editorState: true,
            blockTemplates: {
                template: [templateDummy],
            },
            blockSettings: {
                preview: PREVIEW_MODE_TEMPLATE,
            },
        });
        expect(await screen.findByTestId(PREVIEW_IMAGE_TEST_ID)).toHaveAttribute('src', expectedPreviewUrl);
    });

    it('should render a custom preview image if preview mode is set to custom', async () => {
        const asset = AssetDummy.with(ASSET_ID);
        const expectedPreviewUrl = asset.previewUrl;
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                preview: PREVIEW_MODE_CUSTOM,
            },
            blockAssets: {
                [PREVIEW_CUSTOM_SETTING_ID]: [asset],
            },
        });
        expect(await screen.findByTestId(PREVIEW_IMAGE_TEST_ID)).toHaveAttribute('src', expectedPreviewUrl);
    });

    it('should not render a preview but lay out text and CTA side by side if preview is set to none', async () => {
        renderTemplateBlock({
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
            blockSettings: {
                preview: PREVIEW_MODE_NONE,
            },
        });
        expect(await screen.findByTestId(TEXT_CTA_WRAPPER_TEST_ID)).toHaveClass('@sm:tw-flex-row');
        expect(screen.queryByTestId(PREVIEW_IMAGE_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render a new publication button with RTE in edit mode', async () => {
        renderTemplateBlock({
            editorState: true,
        });
        await waitFor(() => {
            expect(
                within(screen.getByTestId(CTA_BUTTON_TEST_ID)).getByTestId(RICH_TEXT_EDITOR_CONTAINER_TEST_ID)
            ).toBeInTheDocument();
        });
    });

    it('should render block card with no padding', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                paddingChoice_blockCard: Padding.None,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ padding: paddingStyleMap[Padding.None] });
    });

    it('should render block card with small padding', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: true,
                paddingChoice_blockCard: Padding.Small,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ padding: paddingStyleMap[Padding.Small] });
    });

    it('should render block card with medium padding even with disabled border', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: false,
                paddingChoice_blockCard: Padding.Medium,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ padding: paddingStyleMap[Padding.Medium] });
    });

    it('should render block card with large padding even with disabled background', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBackground: false,
                paddingChoice_blockCard: Padding.Large,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ padding: paddingStyleMap[Padding.Large] });
    });

    it('should render block content in columns when text is positioned right', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Right,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).toHaveClass(
            ...textPositioningToContentFlexDirection[TextPositioningType.Right].split(' ')
        );
    });

    it('should render block content in reverse columns when text is positioned left', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).toHaveClass(
            ...textPositioningToContentFlexDirection[TextPositioningType.Left].split(' ')
        );
    });

    it('should respect 3/4 text ratio setting when block is in right mode', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Right,
                textRatio: TextRatioType.ThreeQuarters,
            },
        });
        expect(screen.getByTestId(PREVIEW_TEST_ID)).toHaveClass(
            ...textRatioToInverseFlexBasis[TextRatioType.ThreeQuarters].split(' ')
        );
    });

    it('should respect 1/3 text ratio setting when block is in left mode', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Right,
                textRatio: TextRatioType.OneThird,
            },
        });
        expect(screen.getByTestId(PREVIEW_TEST_ID)).toHaveClass(
            ...textRatioToInverseFlexBasis[TextRatioType.OneThird].split(' ')
        );
    });

    it('should render block content in rows when text is positioned on bottom', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Bottom,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).toHaveClass(
            ...textPositioningToContentFlexDirection[TextPositioningType.Bottom].split(' ')
        );
    });

    it('should render block content in reverse rows when text is positioned on top', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Top,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).toHaveClass(
            ...textPositioningToContentFlexDirection[TextPositioningType.Top].split(' ')
        );
    });

    it('should render block text top anchored', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
                textAnchoringVertical: AnchoringType.Start,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).toHaveClass(
            ...verticalAlignmentToItemAlign[AnchoringType.Start].split(' ')
        );
    });

    it('should render block text center anchored', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Right,
                textAnchoringVertical: AnchoringType.Center,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).toHaveClass(
            ...verticalAlignmentToItemAlign[AnchoringType.Center].split(' ')
        );
    });

    it('should not apply vertical alignment when text is not aligned left or right', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Top,
                textAnchoringVertical: AnchoringType.Center,
            },
        });
        expect(screen.getByTestId(CONTENT_TEST_ID)).not.toHaveClass(
            ...verticalAlignmentToItemAlign[AnchoringType.Center].split(' ')
        );
    });

    it('should render block text and CTA right anchored', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Bottom,
                textAnchoringHorizontal: AnchoringType.End,
            },
        });
        expect(screen.getByTestId(TEXT_TEST_ID)).toHaveClass(
            ...horizontalAlignmentToTextAlign[AnchoringType.End].split(' ')
        );
        expect(screen.getByTestId(CTA_TEST_ID)).toHaveClass(
            ...horizontalAlignmentToCtaSelfAlign[AnchoringType.End].split(' ')
        );
    });

    it('should not apply horizontal alignment when text is not aligned top or bottom', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                textPositioning: TextPositioningType.Left,
                textAnchoringVertical: AnchoringType.Center,
            },
        });
        expect(screen.getByTestId(TEXT_TEST_ID)).not.toHaveClass(
            ...horizontalAlignmentToTextAlign[AnchoringType.Center].split(' ')
        );
        expect(screen.getByTestId(CTA_TEST_ID)).not.toHaveClass(
            ...horizontalAlignmentToCtaSelfAlign[AnchoringType.Center].split(' ')
        );
    });

    it('should render preview with a small height', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                preview: PREVIEW_MODE_TEMPLATE,
                previewHeightSimple: PreviewHeightType.Small,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_WRAPPER_TEST_ID)).toHaveStyle({
            height: previewHeightValues[PreviewHeightType.Small],
        });
    });

    it('should render preview with a medium height', async () => {
        const asset = AssetDummy.with(ASSET_ID);
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                preview: PREVIEW_MODE_CUSTOM,
                previewHeightSimple: PreviewHeightType.Medium,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
            blockAssets: {
                [PREVIEW_CUSTOM_SETTING_ID]: [asset],
            },
        });
        expect(await screen.findByTestId(PREVIEW_WRAPPER_TEST_ID)).toHaveStyle({
            height: previewHeightValues[PreviewHeightType.Medium],
        });
    });

    it('should render preview with a large height', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                previewHeightSimple: PreviewHeightType.Large,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_WRAPPER_TEST_ID)).toHaveStyle({
            height: previewHeightValues[PreviewHeightType.Large],
        });
    });

    it('should fit the preview', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                previewHeightSimple: PreviewHeightType.Small,
                previewDisplay: PreviewDisplayType.Fit,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_IMAGE_TEST_ID)).toHaveClass(
            previewDisplayValues[PreviewDisplayType.Fit]
        );
    });

    it('should fill the preview', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                previewHeightSimple: PreviewHeightType.Small,
                previewDisplay: PreviewDisplayType.Fill,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_IMAGE_TEST_ID)).toHaveClass(
            previewDisplayValues[PreviewDisplayType.Fill]
        );
    });

    it('should render card with a background color', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBackground: true,
                backgroundColor: COLOR_RED,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    it('should render card with a custom border', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBorder_blockCard: true,
                borderWidth_blockCard: '1px',
                borderColor_blockCard: toRgbaString(COLOR_RED),
                borderStyle_blockCard: BorderStyle.Solid,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ border: '1px solid rgb(255, 0, 0)' });
    });

    it('should render card with a medium border radius', () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                radiusChoice_blockCard: Radius.Medium,
            },
        });
        expect(screen.getByTestId(CARD_TEST_ID)).toHaveStyle({ borderRadius: '4px' });
    });

    it('should render preview with a background color', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBackgroundTemplatePreview: true,
                backgroundColorTemplatePreview: COLOR_RED,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_WRAPPER_TEST_ID)).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    it('should render preview with a custom border', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                hasBorder_templatePreview: true,
                borderWidth_templatePreview: '1px',
                borderColor_templatePreview: COLOR_RED,
                borderStyle_templatePreview: BorderStyle.Solid,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_WRAPPER_TEST_ID)).toHaveStyle({ border: '1px solid rgb(255, 0, 0)' });
    });

    it('should render preview with a medium border radius', async () => {
        renderTemplateBlock({
            editorState: true,
            blockSettings: {
                radiusChoice_templatePreview: Radius.Medium,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        expect(await screen.findByTestId(PREVIEW_WRAPPER_TEST_ID)).toHaveStyle({ borderRadius: '4px' });
    });

    it('should render the CTA button with primary styling by default', async () => {
        renderTemplateBlock({
            editorState: false,
            blockSettings: {},
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        const ctaButton = await screen.findByTestId(CTA_BUTTON_TEST_ID);
        expect(ctaButton.getAttribute('style')).toContain(
            'font-size: var(--f-theme-settings-button-primary-font-size)'
        );
    });

    it('should render the CTA button respecting the button styling', async () => {
        renderTemplateBlock({
            editorState: false,
            blockSettings: {
                buttonStyle: 'secondary',
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });
        const ctaButton = await screen.findByTestId(CTA_BUTTON_TEST_ID);
        expect(ctaButton.getAttribute('style')).toContain(
            'font-size: var(--f-theme-settings-button-secondary-font-size)'
        );
    });

    it('should open the template creationFormUri when the CTA is clicked in simple editing mode', async () => {
        const openSpy = vi.fn();
        vi.stubGlobal('open', openSpy);

        renderTemplateBlock({
            editorState: false,
            blockSettings: {
                templateEditing: TemplateEditing.Simple,
            },
            blockTemplates: {
                template: [getTemplateDummyWithPages()],
            },
        });

        const ctaButton = await screen.findByTestId(CTA_BUTTON_TEST_ID);
        await waitFor(() => {
            expect(ctaButton).toBeEnabled();
        });
        await userEvent.click(ctaButton);

        await waitFor(() => {
            expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('/publishing/template/'), '_self');
        });
    });
});
