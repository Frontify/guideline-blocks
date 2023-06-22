/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { LegacyStack } from '@frontify/fondue';
import { Metadata } from '../Components/MetaData';
import { Settings } from '../types';
import { useBlockSettings } from '@frontify/app-bridge';
import { AssetSubmission } from '../module/AssetSubmission/AssetSubmission';
import { getLibraryById } from '../module/Library/Library';
import { Headline, ModalHeadline } from '../Components/Headline';
import { CARD_CONTAINER } from './UserMode';
import { SuccessPage } from './SuccessPage';
import { BlockStyles } from '@frontify/guideline-blocks-shared';

export const EditorMode: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const [buttonHover, setButtonHover] = useState<boolean>(false);

    /**
     * Workaround to store the metadata fields of the library
     * We cannot directly store them from the Settings
     * Listen to a change in the settings and query the endpoint again to then store them
     */
    useEffect(() => {
        (async () => {
            const assetSubmissionRequests = await AssetSubmission.getAssetSubmissionRequests();
            const assetSubmissionMetadataConfig = assetSubmissionRequests.find(
                (submission) => submission.projectId === blockSettings.assetSubmission
            );

            if (assetSubmissionMetadataConfig) {
                const libraryMetadata = await getLibraryById(assetSubmissionMetadataConfig?.projectId);

                await setBlockSettings({
                    assetSubmissionMetadataConfig: libraryMetadata.customMetadataProperties,
                });

                await setBlockSettings({
                    assetSubmissionToken: assetSubmissionMetadataConfig.tokens[0].token,
                });

                await setBlockSettings({
                    assetSubmissionId: assetSubmissionMetadataConfig.id,
                });
            }
        })();
    }, [blockSettings.assetSubmission]);

    console.log(BlockStyles.buttonPrimary);
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
                    <Metadata onSubmit={() => null} appBridge={appBridge} />
                </LegacyStack>
            </div>
            <div className="tw-p-10 tw-rounded tw-border tw-border-black-10 tw-border-dashed">
                <SuccessPage appBridge={appBridge} />
            </div>
        </LegacyStack>
    );
};
