/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { LegacyStack } from '@frontify/fondue';
import { Metadata } from '../Components/MetaData';
import { Settings } from '../types';
import { useBlockSettings } from '@frontify/app-bridge';
import { AssetSubmission } from '../module/AssetSubmission/AssetSubmission';
import { Library, getLibraryById } from '../module/Library/Library';
import { Headline, ModalHeadline } from '../Components/Headline';
import { CARD_CONTAINER } from './UserMode';
import { SuccessPage } from './SuccessPage';
import { BlockStyles } from '@frontify/guideline-blocks-shared';

export const EditorMode: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [{ assetSubmission, assetSubmissionMetadataConfig }] = useBlockSettings<Settings>(appBridge);
    const [buttonHover, setButtonHover] = useState<boolean>(false);

    /**
     * Workaround to store the metadata fields of the library
     * We cannot directly store them from the Settings
     * Listen to a change in the settings and query the endpoint again to then store them
     */

    const [libraryMetadata, setLibraryMetadata] = useState<Library>();
    useEffect(() => {
        (async () => {
            const assetSubmissionRequests = await AssetSubmission.getAssetSubmissionRequests();
            const assetSubmissionRequestMetadataConfig = assetSubmissionRequests.find(
                (submission) => submission.projectId === blockSettings.assetSubmission
            );

            if (!!assetSubmissionRequestMetadataConfig) {
                const libraryMetadataResponse = await getLibraryById(assetSubmissionRequestMetadataConfig?.projectId);
                setLibraryMetadata((prev) => {
                    if (
                        libraryMetadataResponse &&
                        libraryMetadataResponse.customMetadataProperties &&
                        prev?.customMetadataProperties === libraryMetadataResponse.customMetadataProperties
                    ) {
                        return prev;
                    }
                    return libraryMetadataResponse;
                });

                if (
                    libraryMetadataResponse &&
                    libraryMetadataResponse.customMetadataProperties &&
                    libraryMetadataResponse.customMetadataProperties !== assetSubmissionMetadataConfig
                ) {
                    await setBlockSettings({
                        assetSubmissionMetadataConfig: libraryMetadataResponse.customMetadataProperties,
                    });
                }

                await setBlockSettings({
                    assetSubmissionToken: assetSubmissionRequestMetadataConfig.tokens[0].token,
                });

                await setBlockSettings({
                    assetSubmissionId: assetSubmissionRequestMetadataConfig.id,
                });
            }
        })();
    }, [assetSubmission]);

    return (
        <LegacyStack padding="s" spacing="s" direction={'column'}>
            <div className={CARD_CONTAINER}>
                <div className={'tw-w-2/3'}>
                    <Headline appBridge={appBridge} />
                </div>
                <div>
                    <button
                        onMouseEnter={() => setButtonHover(true)}
                        onMouseLeave={() => setButtonHover(false)}
                        style={{
                            ...BlockStyles.buttonPrimary,
                            ...(buttonHover ? BlockStyles.buttonPrimary?.hover : null),
                        }}
                    >
                        <span style={{}}>{blockSettings.buttonText}</span>
                    </button>
                </div>
            </div>
            <div className="tw-p-10 tw-rounded tw-border tw-border-black-10 tw-border-dashed">
                <LegacyStack padding="l" spacing="s" direction={'column'}>
                    <ModalHeadline appBridge={appBridge} />
                    <Metadata
                        onSubmit={() => null}
                        appBridge={appBridge}
                        blockSettings={blockSettings}
                        assetSubmissionMetadataConfig={
                            libraryMetadata && libraryMetadata.customMetadataProperties
                                ? libraryMetadata.customMetadataProperties
                                : []
                        }
                    />
                </LegacyStack>
            </div>
            <div className="tw-p-10 tw-rounded tw-border tw-border-black-10 tw-border-dashed">
                <SuccessPage appBridge={appBridge} setView={() => console.log('')} />
            </div>
        </LegacyStack>
    );
};
