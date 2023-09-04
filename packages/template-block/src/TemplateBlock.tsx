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
    const { blockTemplates, updateTemplateIdsFromKey /*errorMessage*/ } = useBlockTemplates(appBridge);

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
    const [templatePageCount, setTemplatePageCount] = useState(selectedTemplate ? selectedTemplate.pages.length : 0);

    const hasPreview = useCallback(() => preview !== PreviewType.None, [preview]);
    const flexDirection = hasPreview() ? textPositioningToFlexDirection[textPositioning] : 'row';
    const isRows = useCallback(
        () => hasPreview() && (flexDirection === 'row' || flexDirection === 'row-reverse'),
        [flexDirection, hasPreview]
    );

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
            templates.map((template) => setSelectedTemplate(template));
        },
        [setSelectedTemplate]
    );

    // useEffect(() => {
    //     if (errorMessage !== '') {
    //         setLastErrorMessage(errorMessage);
    //         updateTemplateTitle('');
    //         updateTemplateDescription('');
    //     }
    // }, [errorMessage]);

    useEffect(() => {
        if (blockTemplates[SETTING_ID]) {
            updateSelectedTemplate(blockTemplates[SETTING_ID]);
        }
    }, [blockTemplates, updateSelectedTemplate]);

    useEffect(() => {
        if (selectedTemplate) {
            setTemplatePageCount(selectedTemplate.pages.length);
        }
    }, [description, selectedTemplate, title]);

    const onChangeSetting = (key: string, value: string) => {
        updateBlockSettings({ ...blockSettings, [key]: value });
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
        <div data-test-id="template-block">
            {!selectedTemplate && !isEditing ? (
                <div></div>
            ) : (
                <div
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
                    {/*{isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}*/}
                    <div
                        className="tw-flex"
                        style={{
                            flexDirection,
                            gap: GAP,
                            alignItems: isRows() ? textAnchoringHorizontal : textAnchoringVertical,
                        }}
                    >
                        {hasPreview() && (
                            <TemplatePreview
                                appBridge={appBridge}
                                template={selectedTemplate}
                                onUpdateTemplate={updateTemplateIdsFromKey}
                                onUpdateTemplateTitle={updateTemplateTitle}
                                onUpdateTemplateDescription={updateTemplateDescription}
                                onError={setLastErrorMessage}
                            />
                        )}
                        <div
                            className={merge(['tw-flex', isRows() && hasPreview() ? 'tw-flex-col' : 'tw-flex-row'])}
                            style={{
                                width: isRows() && hasPreview() ? `${textRatio}%` : '100%',
                                gap: GAP,
                            }}
                        >
                            <div className="tw-grow tw-min-w-0">
                                <div className="tw-mb-2">
                                    {isEditing ? (
                                        <TextInput
                                            id={`${blockId}-title`}
                                            value={templateTitle}
                                            placeholder={isEditing ? 'Template Name' : undefined}
                                            onChange={updateTemplateTitle}
                                        />
                                    ) : (
                                        <Heading size="xx-large" weight="strong">
                                            {templateTitle}
                                        </Heading>
                                    )}
                                    <div>
                                        <Text size={'small'}>{templatePageCount} pages</Text>
                                    </div>
                                </div>
                                {isEditing ? (
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
                                    />
                                ) : (
                                    <Text>{templateDescription}</Text>
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
            )}
        </div>
    );
};
