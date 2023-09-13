/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    OpenNewPublicationPayload,
    Template,
    openNewPublication,
    useBlockSettings,
    useBlockTemplates,
    useEditorState,
} from '@frontify/app-bridge';
import { ReactElement, useEffect, useReducer, useState } from 'react';
import {
    BlockProps,
    getBackgroundColorStyles,
    paddingStyleMap,
    radiusStyleMap,
    toRgbaString,
} from '@frontify/guideline-blocks-settings';
import { PreviewType, Settings, textPositioningToFlexDirection } from './types';
import { GAP, TEMPLATE_BLOCK_SETTING_ID } from './constants';
import { Button, ButtonEmphasis, ButtonStyle, Heading, Text, TextInput, Textarea, merge } from '@frontify/fondue';
import { TemplatePreview } from './components/TemplatePreview';
import { AlertError } from './components/AlertError';
import { TemplateDataActionType, templateDataReducer } from './reducers/templateDataReducer';
import { TemplateText } from './components/TemplateText';

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
        hasCustomPaddingValue_blockCard,
        paddingValue_blockCard,
        paddingChoice_blockCard,
        hasBackground,
        backgroundColor,
        hasBorder_blockCard,
        borderWidth_blockCard,
        borderColor_blockCard,
        borderStyle_blockCard,
        hasRadius_blockCard,
        radiusValue_blockCard,
        radiusChoice_blockCard,
        textPositioning,
        textRatio,
        textAnchoringHorizontal,
        textAnchoringVertical,
    } = blockSettings;

    const [{ templateTitle, templateDescription }, dispatch] = useReducer(templateDataReducer, {
        templateTitle: title ?? '',
        templateDescription: description ?? '',
    });

    const hasPreview = preview !== PreviewType.None;
    const flexDirection = hasPreview ? textPositioningToFlexDirection[textPositioning] : 'row';
    const isRows = hasPreview && (flexDirection === 'row' || flexDirection === 'row-reverse');
    const borderRadius = hasRadius_blockCard ? radiusValue_blockCard : radiusStyleMap[radiusChoice_blockCard];
    const border = hasBorder_blockCard
        ? `${borderWidth_blockCard} ${borderStyle_blockCard} ${toRgbaString(borderColor_blockCard)}`
        : 'none';

    useEffect(() => {
        updateBlockSettings({ title: templateTitle });
    }, [templateTitle]);

    useEffect(() => {
        updateBlockSettings({ description: templateDescription });
    }, [templateDescription]);

    useEffect(() => {
        if (error !== null) {
            setLastErrorMessage(error);
            dispatch({ type: TemplateDataActionType.UPDATE_TITLE, payload: { newValue: '' } });
            dispatch({ type: TemplateDataActionType.UPDATE_DESCRIPTION, payload: { newValue: '' } });
        }
    }, [error]);

    useEffect(() => {
        if (blockTemplates[TEMPLATE_BLOCK_SETTING_ID] && blockTemplates[TEMPLATE_BLOCK_SETTING_ID].length > 0) {
            const lastTemplate = blockTemplates[TEMPLATE_BLOCK_SETTING_ID].pop();

            if (lastTemplate) {
                setSelectedTemplate(lastTemplate);
            }
        }
    }, [blockTemplates]);

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
                        ...(hasBackground && {
                            ...getBackgroundColorStyles(backgroundColor),
                        }),
                        borderRadius,
                        border,
                        padding: hasCustomPaddingValue_blockCard
                            ? paddingValue_blockCard
                            : paddingStyleMap[paddingChoice_blockCard],
                    }}
                >
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}
                    <div
                        className="tw-flex justify-test"
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
                                onUpdateTemplateTitle={(newValue, prevValue) =>
                                    dispatch({
                                        type: TemplateDataActionType.UPDATE_TITLE,
                                        payload: { newValue, prevValue },
                                    })
                                }
                                onUpdateTemplateDescription={(newValue, prevValue) =>
                                    dispatch({
                                        type: TemplateDataActionType.UPDATE_DESCRIPTION,
                                        payload: { newValue, prevValue },
                                    })
                                }
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
                                {
                                    <TemplateText
                                        appBridge={appBridge}
                                        title={templateTitle}
                                        description={templateDescription}
                                        pageCount={selectedTemplate?.pages.length ?? 0}
                                        isEditing={isEditing}
                                        setTitle={(newValue, prevValue) =>
                                            dispatch({
                                                type: TemplateDataActionType.UPDATE_TITLE,
                                                payload: { newValue, prevValue },
                                            })
                                        }
                                        setDescription={(newValue, prevValue) =>
                                            dispatch({
                                                type: TemplateDataActionType.UPDATE_DESCRIPTION,
                                                payload: { newValue, prevValue },
                                            })
                                        }
                                    />
                                }
                            </div>
                            <div className="tw-shrink-0">
                                <Button
                                    data-test-id="template-block-new-publication-btn"
                                    emphasis={ButtonEmphasis.Default}
                                    style={ButtonStyle.Default}
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
