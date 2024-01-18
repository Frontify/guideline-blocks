/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';
import { OpenNewPublicationPayload, openNewPublication, openTemplateChooser } from '@frontify/app-bridge';
import { Button, ButtonEmphasis, Text, merge } from '@frontify/fondue';
import { type BlockProps, getBackgroundColorStyles } from '@frontify/guideline-blocks-settings';

import { AlertError } from './components/AlertError';
import { CustomButton } from './components/CustomButton';
import { TemplatePreview } from './components/TemplatePreview';
import { TemplateText } from './components/TemplateText';
import { GAP, VERTICAL_GAP } from './constants';
import { AnchoringType, PreviewType, TextPositioningType, justifyHorizontal } from './types';
import { getCardPadding, getLayoutClasses } from './helpers/layout';
import { useTemplateBlockData } from './hooks/useTemplateBlockData';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const {
        selectedTemplate,
        preview,
        previewCustom,
        isEditing,
        hasBackground,
        backgroundColor,
        borderRadius,
        border,
        blockSettings,
        lastErrorMessage,
        flexDirectionStyles,
        textPositioning,
        isRows,
        textAnchoringVertical,
        hasPreview,
        textRatio,
        textAnchoringHorizontal,
        title,
        description,
        templateTextKey,
        saveDescription,
        saveTitle,
        updateBlockSettings,
    } = useTemplateBlockData(appBridge);

    const handleNewPublication = async () => {
        if (selectedTemplate !== null) {
            const previewUrl =
                preview === PreviewType.Custom && Array.isArray(previewCustom) && previewCustom.length > 0
                    ? previewCustom[0].previewUrl
                    : selectedTemplate.previewUrl;

            const options: OpenNewPublicationPayload = {
                template: {
                    ...selectedTemplate,
                    previewUrl,
                },
            };

            await appBridge.dispatch(openNewPublication(options));
        }
    };

    const handleOpenTemplateChooser = () => appBridge.dispatch(openTemplateChooser());

    return (
        <div data-test-id="template-block-container" className="template-block">
            {selectedTemplate || isEditing ? (
                <div
                    data-test-id="template-block-card"
                    className="tw-border tw-border-black-20"
                    style={{
                        ...(hasBackground && getBackgroundColorStyles(backgroundColor)),
                        borderRadius,
                        border,
                        padding: getCardPadding(blockSettings),
                    }}
                >
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}
                    <div
                        data-test-id="template-block-content"
                        className={`tw-flex ${flexDirectionStyles}`}
                        style={{
                            gap: textPositioning !== TextPositioningType.Top ? GAP : undefined,
                            alignItems: isRows ? textAnchoringVertical : undefined,
                        }}
                    >
                        {hasPreview && (
                            <TemplatePreview
                                appBridge={appBridge}
                                blockSettings={blockSettings}
                                template={selectedTemplate}
                                updateBlockSettings={updateBlockSettings}
                                onOpenTemplateChooser={handleOpenTemplateChooser}
                                isRows={isRows}
                            />
                        )}
                        <div
                            className={merge(['tw-flex', getLayoutClasses(hasPreview, textPositioning)])}
                            style={{
                                width: isRows && hasPreview ? `${textRatio}%` : '100%',
                                textAlign: !isRows && hasPreview ? textAnchoringHorizontal : AnchoringType.Start,
                                gap: VERTICAL_GAP,
                            }}
                        >
                            <div className={merge(['tw-grow tw-min-w-0', !hasPreview && 'tw-col-span-2'])}>
                                <TemplateText
                                    appBridge={appBridge}
                                    title={title}
                                    blockSettings={blockSettings}
                                    description={description}
                                    pageCount={selectedTemplate?.pages.length ?? 0}
                                    isEditing={isEditing}
                                    key={templateTextKey}
                                    setTitle={saveTitle}
                                    setDescription={saveDescription}
                                />
                            </div>
                            <div
                                className={
                                    hasPreview
                                        ? justifyHorizontal[textAnchoringHorizontal]
                                        : 'tw-flex tw-justify-end tw-items-start'
                                }
                            >
                                <CustomButton
                                    blockSettings={blockSettings}
                                    isEditing={isEditing}
                                    isDisabled={!selectedTemplate}
                                    updateBlockSettings={updateBlockSettings}
                                    handleNewPublication={handleNewPublication}
                                />
                            </div>
                        </div>
                    </div>
                    {!hasPreview && isEditing && (
                        <div className="tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-box-neutral tw-rounded">
                            <div>
                                <Text size="large" color="x-weak">
                                    Connected template:{' '}
                                </Text>
                                <Text size="large">{selectedTemplate?.name ?? 'None'}</Text>
                            </div>

                            <Button
                                emphasis={selectedTemplate ? ButtonEmphasis.Default : ButtonEmphasis.Strong}
                                onClick={handleOpenTemplateChooser}
                            >
                                {selectedTemplate ? 'Replace template' : 'Choose existing template'}
                            </Button>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};
