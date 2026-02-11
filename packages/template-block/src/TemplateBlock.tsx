/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type OpenNewPublicationPayload, openNewPublication, openTemplateChooser } from '@frontify/app-bridge';
import { Text, Button } from '@frontify/fondue/components';
import { type BlockProps } from '@frontify/guideline-blocks-settings';
import { StyleProvider } from '@frontify/guideline-blocks-shared';
import { type ReactElement } from 'react';

import { AlertError } from './components/AlertError';
import { CtaButton } from './components/CtaButton';
import { TemplatePreview } from './components/TemplatePreview';
import { TemplateText } from './components/TemplateText';
import { useTemplateBlockData } from './hooks/useTemplateBlockData';
import { PreviewType, TemplateEditing } from './types';

export const TemplateBlock = ({ appBridge }: BlockProps): ReactElement => {
    const {
        blockSettings,
        cardStyles,
        contentClasses,
        ctaClasses,
        description,
        handleDeleteCustomPreview,
        hasAuthenticatedUser,
        hasPreview,
        hasTitleOnly,
        isEditing,
        lastErrorMessage,
        preview,
        previewClasses,
        previewCustom,
        selectedTemplate,
        templateTextKey,
        textClasses,
        textCtaWrapperClasses,
        title,
        updateBlockSettings,
    } = useTemplateBlockData(appBridge);

    const handleNewPublication = async () => {
        if (!selectedTemplate) {
            return;
        }
        const { templateEditing } = blockSettings;

        if (templateEditing === TemplateEditing.Simple) {
            open(selectedTemplate.creationFormUri, '_self');
        } else {
            const previewUrl =
                preview === PreviewType.Custom && previewCustom
                    ? previewCustom.previewUrl
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

    if (!isEditing && (!selectedTemplate || !hasAuthenticatedUser)) {
        return <div data-test-id="container" className="template-block"></div>;
    }

    return (
        <div data-test-id="container" className="template-block tw-@container">
            <StyleProvider>
                <div data-test-id="card" style={cardStyles}>
                    {isEditing && lastErrorMessage !== '' && <AlertError errorMessage={lastErrorMessage} />}

                    <div data-test-id="content" className={contentClasses}>
                        {hasPreview && (
                            <TemplatePreview
                                appBridge={appBridge}
                                blockSettings={blockSettings}
                                template={selectedTemplate}
                                previewCustom={previewCustom}
                                previewClasses={previewClasses}
                                updateBlockSettings={updateBlockSettings}
                                onOpenTemplateChooser={handleOpenTemplateChooser}
                                handleNewPublication={handleNewPublication}
                                handleDeleteCustomPreview={handleDeleteCustomPreview}
                            />
                        )}

                        <div data-test-id="text-cta-wrapper" className={textCtaWrapperClasses}>
                            <div data-test-id="text" className={textClasses}>
                                <TemplateText
                                    appBridge={appBridge}
                                    updateBlockSettings={updateBlockSettings}
                                    title={title}
                                    description={description}
                                    pageCount={
                                        blockSettings.hasPageCount !== false
                                            ? (selectedTemplate?.pages.length ?? 0)
                                            : undefined
                                    }
                                    isEditing={isEditing}
                                    hasTitleOnly={hasTitleOnly}
                                    templateTextKey={templateTextKey}
                                />
                            </div>
                            <div data-test-id="cta" className={ctaClasses}>
                                <CtaButton
                                    appBridge={appBridge}
                                    blockSettings={blockSettings}
                                    isEditing={isEditing}
                                    isDisabled={!selectedTemplate}
                                    updateBlockSettings={updateBlockSettings}
                                    handleNewPublication={handleNewPublication}
                                />
                            </div>
                        </div>
                    </div>

                    {isEditing && !hasPreview && (
                        <div
                            data-test-id="cta-editing-no-preview"
                            className="tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-box-neutral tw-rounded tw-flex-col @sm:tw-flex-row"
                        >
                            <div>
                                <Text size="large" color="x-weak">
                                    {'Connected template: '}
                                </Text>
                                <Text size="large">{selectedTemplate?.name ?? 'None'}</Text>
                            </div>

                            <Button
                                className="tw-line-clamp-2"
                                emphasis={selectedTemplate ? 'default' : 'strong'}
                                onPress={handleOpenTemplateChooser}
                            >
                                {selectedTemplate ? 'Replace template' : 'Choose existing template'}
                            </Button>
                        </div>
                    )}
                </div>
            </StyleProvider>
        </div>
    );
};
