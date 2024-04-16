/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';
import { OpenNewPublicationPayload, openNewPublication, openTemplateChooser } from '@frontify/app-bridge';
import { Button, ButtonEmphasis, Text } from '@frontify/fondue';
import { type BlockProps } from '@frontify/guideline-blocks-settings';

import { AlertError } from './components/AlertError';
import { CtaButton } from './components/CtaButton';
import { TemplatePreview } from './components/TemplatePreview';
import { TemplateText } from './components/TemplateText';
import { PreviewType, TemplateEditing } from './types';
import { useTemplateBlockData } from './hooks/useTemplateBlockData';

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
        if (selectedTemplate !== null) {
            const { templateEditing } = blockSettings;
            if (templateEditing === TemplateEditing.Simple) {
                const uri = `/publishing/template/${selectedTemplate.id}?referer=${window.location.href.replaceAll(
                    '/',
                    '%2F'
                )}`;
                open(uri, '_self');
                return;
            }
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
        <div data-test-id="container" className="template-block">
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
                                        ? selectedTemplate?.pages.length ?? 0
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
                        className="tw-flex tw-justify-between tw-items-center tw-mt-4 tw-p-3 tw-pl-4 tw-bg-black-0 tw-border tw-border-box-neutral tw-rounded"
                    >
                        <div>
                            <Text size="large" color="x-weak">
                                {'Connected template: '}
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
        </div>
    );
};
