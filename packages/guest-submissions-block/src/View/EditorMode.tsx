/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useEffect } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Button, LegacyStack } from '@frontify/fondue';
import { Metadata } from '../Components/MetaData';
import { Settings } from '../types';
import { useBlockSettings } from '@frontify/app-bridge';
import { AssetSubmission } from '../module/AssetSubmission/AssetSubmission';
import { getLibraryById } from '../module/Library/Library';
import { Headline, ModalHeadline } from '../Components/Headline';
import { CARD_CONTAINER } from './UserMode';

export const EditorMode: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

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

    return (
        <LegacyStack padding="s" spacing="s" direction={'column'}>
            <div className={CARD_CONTAINER}>
                <Headline appBridge={appBridge} />
                <div>
                    <Button>{blockSettings.buttonText}</Button>
                </div>
            </div>
            <div className="tw-rounded tw-bg-base-alt">
                <LegacyStack padding="l" spacing="s" direction={'column'}>
                    <ModalHeadline appBridge={appBridge} />
                    <Metadata onSubmit={() => null} appBridge={appBridge} />
                </LegacyStack>
            </div>
        </LegacyStack>
    );
};
