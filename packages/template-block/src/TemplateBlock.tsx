/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    OpenNewPublicationPayload,
    Template,
    openNewPublication,
    useBlockSettings,
    useBlockTemplates,
    useEditorState,
} from '@frontify/app-bridge';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { PreviewType, Settings, cardPaddingValues, cornerRadiusValues, textPositioningToFlexDirection } from './types';
import { GAP, SETTING_ID } from './constants';
import { Button, ButtonEmphasis, Color, Heading, Text, TextInput, Textarea, merge } from '@frontify/fondue';
import { getRgbaString } from './utils';
import { TemplatePreview } from './components/TemplatePreview';
import { AlertError } from './components/AlertError';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [lastErrorMessage, setLastErrorMessage] = useState('');
    const isEditing = useEditorState(appBridge);
    const blockId = appBridge.getBlockId();
    const { blockTemplates, updateTemplateIdsFromKey, error } = useBlockTemplates(appBridge);

    const {
        title,
        description,
        preview,
        isCardPaddingCustom,
        cardPaddingSimple,
        cardPaddingCustomTop,
        cardPaddingCustomLeft,
        cardPaddingCustomRight,
        cardPaddingCustomBottom,
        hasCardBackgroundColor,
        cardBackgroundColor,
        hasCardBorder,
        cardBorderColor,
        cardBorderStyle,
        cardBorderWidth,
        isCardCornerRadiusCustom,
        cardCornerRadiusSimple,
        cardCornerRadiusCustom,
        textPositioning,
        textRatio,
        textAnchoringHorizontal,
        textAnchoringVertical,
    } = blockSettings;

    const [templateTitle, setTemplateTitle] = useState(title ?? '');
    const [templateDescription, setTemplateDescription] = useState(description ?? '');

    const hasPreview = preview !== PreviewType.None;
    const flexDirection = hasPreview ? textPositioningToFlexDirection[textPositioning] : 'row';
    const isRows = hasPreview && (flexDirection === 'row' || flexDirection === 'row-reverse');

    const updateTemplateTitle = (value: string) => {
        setTemplateTitle(value);
        onChangeSetting('title', value);
    };

    const updateTemplateDescription = (value: string) => {
        setTemplateDescription(value);
        onChangeSetting('description', value);
    };

    const updateSelectedTemplate = useCallback(
        (templates: Template[]) => {
            const lastTemplate = templates.pop();

            if (lastTemplate) {
                setSelectedTemplate(lastTemplate);
            }
        },
        [setSelectedTemplate],
    );

    useEffect(() => {
        if (error !== null) {
            setLastErrorMessage(error);
            updateTemplateTitle('');
            updateTemplateDescription('');
        }
    }, [error]);

    useEffect(() => {
        if (blockTemplates[SETTING_ID]) {
            updateSelectedTemplate(blockTemplates[SETTING_ID]);
        }
    }, [blockTemplates, updateSelectedTemplate]);

    const onChangeSetting = async <Key extends keyof Settings>(key: Key, value: Settings[Key]) => {
        await updateBlockSettings({ ...blockSettings, [key]: value });
    };

    const handleNewPublication = () => {
        if (selectedTemplate !== null) {
            const options: OpenNewPublicationPayload = {
                template: selectedTemplate,
            };

            appBridge.dispatch(openNewPublication(options));
        }
    };

    return (
        <div data-test-id="template-block-container">
            {selectedTemplate || isEditing ? (
                <div
                    data-test-id="template-block"
                    className="tw-border tw-border-black-20"
                    style={{
                        backgroundColor: hasCardBackgroundColor
                            ? getRgbaString(cardBackgroundColor as Color)
                            : undefined,
                        borderRadius: isCardCornerRadiusCustom
                            ? cardCornerRadiusCustom
                            : cornerRadiusValues[cardCornerRadiusSimple],
                        border: hasCardBorder
                            ? `${cardBorderWidth} ${cardBorderStyle} ${getRgbaString(cardBorderColor as Color)}`
                            : 'none',
                        padding: isCardPaddingCustom
                            ? `${cardPaddingCustomTop} ${cardPaddingCustomRight} ${cardPaddingCustomBottom} ${cardPaddingCustomLeft}`
                            : cardPaddingValues[cardPaddingSimple],
                    }}
                >
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}
                    <div
                        className="tw-flex"
                        style={{
                            flexDirection,
                            gap: GAP,
                            alignItems: isRows ? textAnchoringHorizontal : textAnchoringVertical,
                        }}
                    >
                        {hasPreview && (
                            <TemplatePreview
                                appBridge={appBridge}
                                blockSettings={blockSettings}
                                template={selectedTemplate}
                                onUpdateTemplate={updateTemplateIdsFromKey}
                                onUpdateTemplateTitle={updateTemplateTitle}
                                onUpdateTemplateDescription={updateTemplateDescription}
                                onSave={updateBlockSettings}
                                onError={setLastErrorMessage}
                            />
                        )}
                        <div
                            className={merge(['tw-flex', isRows && hasPreview ? 'tw-flex-col' : 'tw-flex-row'])}
                            style={{
                                width: isRows && hasPreview ? `${textRatio}%` : '100%',
                                gap: GAP,
                            }}
                        >
                            <div className="tw-grow tw-min-w-0">
                                <div className="tw-mb-2">
                                    {isEditing ? (
                                        <span data-test-id="template-block-title-edit">
                                            <TextInput
                                                id={`${blockId}-title`}
                                                value={templateTitle}
                                                placeholder={isEditing ? 'Template Name' : undefined}
                                                onChange={updateTemplateTitle}
                                            />
                                        </span>
                                    ) : (
                                        <Heading size="xx-large" weight="strong">
                                            <span data-test-id="template-block-title">{templateTitle}</span>
                                        </Heading>
                                    )}
                                    <div>
                                        <Text size="small">
                                            <span data-test-id="template-block-page-count">
                                                {selectedTemplate?.pages.length ?? 0} pages
                                            </span>
                                        </Text>
                                    </div>
                                </div>
                                {isEditing ? (
                                    <span data-test-id="template-block-description-edit">
                                        <Textarea
                                            id={`${blockId}-description`}
                                            value={templateDescription}
                                            autosize={true}
                                            resizeable={false}
                                            placeholder={
                                                isEditing
                                                    ? 'Use default Template description if available, add your own or leave it empty'
                                                    : undefined
                                            }
                                            onInput={updateTemplateDescription}
                                            data-test-id="template-block-description-editing"
                                        />
                                    </span>
                                ) : (
                                    <Text>
                                        <span data-test-id="template-block-description">{templateDescription}</span>
                                    </Text>
                                )}
                            </div>
                            <div className="tw-shrink-0">
                                <Button
                                    data-test-id="template-block-new-publication-btn"
                                    emphasis={ButtonEmphasis.Default}
                                    onClick={handleNewPublication}
                                    disabled={!selectedTemplate}
                                >
                                    Use this Template
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
