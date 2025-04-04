/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FileExtensionSets } from '@frontify/app-bridge';
import { IconEnum } from '@frontify/fondue';
import {
    type Bundle,
    NotificationStyleType,
    Radius,
    appendUnit,
    defineSettings,
    getBackgroundSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    getPaddingSettings,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
    radiusStyleMap,
} from '@frontify/guideline-blocks-settings';
import {
    AnchoringType,
    PreviewDisplayType,
    PreviewHeightType,
    PreviewType,
    TemplateEditing,
    TextPositioningType,
    TextRatioType,
    paddingStyleMap,
    previewHeightValues,
} from './types';
import { TEMPLATE_BLOCK_SETTING_ID } from './constants';

export const DEFAULT_BACKGROUND_COLOR = { red: 255, green: 255, blue: 255, alpha: 1 };
export const DEFAULT_BORDER_COLOR = { red: 234, green: 235, blue: 235, alpha: 1 };

export const settings = defineSettings({
    main: [],
    basics: [
        {
            id: TEMPLATE_BLOCK_SETTING_ID,
            type: 'templateInput',
            label: 'Template',
            showForTranslations: true,
        },
        {
            id: 'hasPageCount',
            type: 'switch',
            defaultValue: false,
            label: 'Show page count',
            info: 'Show or hide the page count indicator',
        },
        {
            id: 'preview',
            type: 'slider',
            label: 'Preview',
            choices: [
                {
                    label: 'Template',
                    value: PreviewType.Template,
                },
                {
                    label: 'Custom',
                    value: PreviewType.Custom,
                },
                {
                    label: 'None',
                    value: PreviewType.None,
                },
            ],
            defaultValue: PreviewType.Template,
            showForTranslations: true,
        },
        {
            id: 'previewCustom',
            type: 'assetInput',
            size: 'small',
            extensions: FileExtensionSets.Images,
            label: 'Custom Preview',
            show: (bundle: Bundle) => bundle.getBlock('preview')?.value === PreviewType.Custom,
            showForTranslations: true,
        },
        {
            id: 'templateEditingHeading',
            type: 'sectionHeading',
            blocks: [
                {
                    id: 'templateEditing',
                    label: 'Template editing',
                    info: 'Choose how users can make changes to the template.',
                    type: 'slider',
                    choices: [
                        { label: 'Simple', value: TemplateEditing.Simple },
                        { label: 'Advanced', value: TemplateEditing.Advanced },
                    ],
                    defaultValue: TemplateEditing.Advanced,
                    showForTranslations: true,
                },
                {
                    id: 'templateEditingNotificationSimple',
                    type: 'notification',
                    text: 'Users can only make changes by selecting and editing fields in the settings panel without approvals.',
                    show: (bundle: Bundle) => bundle.getBlock('templateEditing')?.value === TemplateEditing.Simple,
                    styles: {
                        type: NotificationStyleType.Info,
                    },
                    showForTranslations: true,
                },
                {
                    id: 'templateEditingNotificationAdvanced',
                    type: 'notification',
                    text: 'Users can select layers and edit text directly.',
                    show: (bundle: Bundle) => bundle.getBlock('templateEditing')?.value === TemplateEditing.Advanced,
                    styles: {
                        type: NotificationStyleType.Info,
                    },
                    showForTranslations: true,
                },
            ],
        },
    ],
    layout: [
        {
            id: 'cardLayoutHeading',
            type: 'sectionHeading',
            label: 'Card',
            blocks: [
                getPaddingSettings({
                    id: 'blockCard',
                    paddingStyleMap,
                }),
            ],
        },
        {
            id: 'textLayoutHeading',
            type: 'sectionHeading',
            label: 'Text',
            show: (bundle: Bundle) => bundle.getBlock('preview')?.value !== PreviewType.None,
            blocks: [
                {
                    id: 'textPositioning',
                    label: 'Positioning',
                    type: 'slider',
                    defaultValue: TextPositioningType.Right,
                    info: "Where the UI elements are in relation to one another. Some settings won't apply if the container is too narrow.",
                    choices: [
                        {
                            value: TextPositioningType.Bottom,
                            icon: 'MediaObjectTextBottom' as IconEnum.MediaObjectTextBottom,
                        },
                        {
                            value: TextPositioningType.Top,
                            icon: 'MediaObjectTextTop' as IconEnum.MediaObjectTextTop,
                        },
                        {
                            value: TextPositioningType.Right,
                            icon: 'MediaObjectTextRight' as IconEnum.MediaObjectTextRight,
                        },
                        {
                            value: TextPositioningType.Left,
                            icon: 'MediaObjectTextLeft' as IconEnum.MediaObjectTextLeft,
                        },
                    ],
                },
                {
                    id: 'textRatio',
                    label: 'Ratio',
                    type: 'slider',
                    defaultValue: TextRatioType.OneHalf,
                    info: "The text to image width ratio. Some settings won't apply if the container is too narrow.",
                    show: (bundle: Bundle) => {
                        const textPositioning = bundle.getBlock('textPositioning')?.value;
                        return (
                            textPositioning === TextPositioningType.Right ||
                            textPositioning === TextPositioningType.Left
                        );
                    },
                    choices: [
                        {
                            value: TextRatioType.OneQuarter,
                            icon: 'MediaObjectRatio3To1' as IconEnum.MediaObjectRatio3To1,
                        },
                        {
                            value: TextRatioType.OneThird,
                            icon: 'MediaObjectRatio2To1' as IconEnum.MediaObjectRatio2To1,
                        },
                        {
                            value: TextRatioType.OneHalf,
                            icon: 'MediaObjectRatio1To1' as IconEnum.MediaObjectRatio1To1,
                        },
                        {
                            value: TextRatioType.TwoThirds,
                            icon: 'MediaObjectRatio1To2' as IconEnum.MediaObjectRatio1To2,
                        },
                        {
                            value: TextRatioType.ThreeQuarters,
                            icon: 'MediaObjectRatio1To3' as IconEnum.MediaObjectRatio1To3,
                        },
                    ],
                },
                {
                    id: 'textAnchoringVertical',
                    type: 'slider',
                    label: 'Vertical alignment',
                    defaultValue: AnchoringType.Start,
                    show: (bundle: Bundle) => {
                        const textPositioning = bundle.getBlock('textPositioning')?.value;
                        return (
                            textPositioning === TextPositioningType.Right ||
                            textPositioning === TextPositioningType.Left
                        );
                    },
                    choices: [
                        {
                            value: AnchoringType.Start,
                            icon: IconEnum.ArrowAlignUp,
                        },
                        {
                            value: AnchoringType.Center,
                            icon: IconEnum.ArrowAlignHorizontalCentre,
                        },
                        {
                            value: AnchoringType.End,
                            icon: IconEnum.ArrowAlignDown,
                        },
                    ],
                },
                {
                    id: 'textAnchoringHorizontal',
                    type: 'slider',
                    label: 'Horizontal alignment',
                    defaultValue: AnchoringType.Start,
                    show: (bundle: Bundle) => {
                        const textPositioning = bundle.getBlock('textPositioning')?.value;
                        return (
                            textPositioning === TextPositioningType.Top ||
                            textPositioning === TextPositioningType.Bottom
                        );
                    },
                    choices: [
                        {
                            value: AnchoringType.Start,
                            icon: IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: AnchoringType.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                        },
                        {
                            value: AnchoringType.End,
                            icon: IconEnum.ArrowAlignRight,
                        },
                    ],
                },
            ],
        },
        {
            id: 'previewLayoutHeading',
            type: 'sectionHeading',
            label: 'Preview',
            show: (bundle: Bundle) => bundle.getBlock('preview')?.value !== PreviewType.None,
            blocks: [
                {
                    id: 'isPreviewHeightCustom',
                    type: 'switch',
                    label: 'Height',
                    switchLabel: 'Custom',
                    info: 'Determines the preview height.',
                    defaultValue: false,
                    onChange: (bundle) => {
                        presetCustomValue(bundle, 'previewHeightSimple', 'previewHeightCustom', previewHeightValues);
                    },
                    on: [
                        {
                            id: 'previewHeightCustom',
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            clearable: true,
                            rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(10)],
                            onChange: (bundle) => {
                                appendUnit(bundle, 'previewHeightCustom');
                            },
                        },
                    ],
                    off: [
                        {
                            id: 'previewHeightSimple',
                            type: 'slider',
                            defaultValue: PreviewHeightType.Auto,
                            choices: [
                                {
                                    value: PreviewHeightType.Auto,
                                    label: 'Auto',
                                },
                                {
                                    value: PreviewHeightType.Small,
                                    label: 'S',
                                },
                                {
                                    value: PreviewHeightType.Medium,
                                    label: 'M',
                                },
                                {
                                    value: PreviewHeightType.Large,
                                    label: 'L',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'previewDisplay',
                    type: 'slider',
                    label: 'Display',
                    defaultValue: PreviewDisplayType.Fit,
                    show: (bundle: Bundle) => bundle.getBlock('previewHeightSimple')?.value !== PreviewHeightType.Auto,
                    choices: [
                        {
                            value: PreviewDisplayType.Fit,
                            label: 'Fit',
                        },
                        {
                            value: PreviewDisplayType.Fill,
                            label: 'Fill',
                        },
                    ],
                },
                {
                    id: 'previewImageAnchoring',
                    type: 'slider',
                    label: 'Image anchoring',
                    defaultValue: AnchoringType.Center,
                    show: (bundle: Bundle) =>
                        bundle.getBlock('previewHeightSimple')?.value !== PreviewHeightType.Auto &&
                        bundle.getBlock('previewDisplay')?.value === PreviewDisplayType.Fit,
                    choices: [
                        {
                            value: AnchoringType.Start,
                            icon: IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: AnchoringType.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                        },
                        {
                            value: AnchoringType.End,
                            icon: IconEnum.ArrowAlignRight,
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'cardStyleHeading',
            type: 'sectionHeading',
            label: 'Button',
            blocks: [
                {
                    id: 'buttonStyle',
                    type: 'dropdown',
                    size: 'small',
                    defaultValue: 'primary',
                    label: 'Style',
                    choices: [
                        {
                            label: 'Primary',
                            value: 'primary',
                        },
                        {
                            label: 'Secondary',
                            value: 'secondary',
                        },
                        {
                            label: 'Tertiary',
                            value: 'tertiary',
                        },
                    ],
                },
            ],
        },
        {
            id: 'cardStyleHeading',
            type: 'sectionHeading',
            label: 'Card',
            blocks: [
                {
                    ...getBackgroundSettings({
                        defaultValue: true,
                        defaultColor: DEFAULT_BACKGROUND_COLOR,
                    }),
                },
                {
                    ...getBorderSettings({
                        id: 'blockCard',
                        defaultValue: true,
                        defaultColor: DEFAULT_BORDER_COLOR,
                    }),
                },
                {
                    ...getBorderRadiusSettings({
                        id: 'blockCard',
                    }),
                    show: (bundle: Bundle) =>
                        bundle.getBlock('hasBackground')?.value === true ||
                        bundle.getBlock('hasBorder_blockCard')?.value === true,
                    onChange: (bundle) =>
                        bundle.setBlockValue(
                            'radiusValue_blockCard',
                            radiusStyleMap[bundle.getBlock('radiusChoice_blockCard')?.value as Radius]
                        ),
                },
            ],
        },
        {
            id: 'previewStyleHeading',
            type: 'sectionHeading',
            label: 'Preview',
            show: (bundle: Bundle) => bundle.getBlock('preview')?.value !== PreviewType.None,
            blocks: [
                {
                    ...getBackgroundSettings({
                        id: 'TemplatePreview',
                        defaultValue: true,
                        defaultColor: DEFAULT_BACKGROUND_COLOR,
                    }),
                },
                {
                    ...getBorderSettings({
                        id: 'templatePreview',
                        defaultValue: true,
                        defaultColor: DEFAULT_BORDER_COLOR,
                    }),
                },
                {
                    ...getBorderRadiusSettings({
                        id: 'templatePreview',
                    }),
                    onChange: (bundle) =>
                        bundle.setBlockValue(
                            'radiusValue_templatePreview',
                            radiusStyleMap[bundle.getBlock('radiusChoice_templatePreview')?.value as Radius]
                        ),
                },
            ],
        },
    ],
});
