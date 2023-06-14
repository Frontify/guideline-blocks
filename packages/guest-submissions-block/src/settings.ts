/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, defineSettings } from '@frontify/guideline-blocks-settings';
import { AssetSubmission } from './module/AssetSubmission/AssetSubmission';
import { queryLibrariesByIds } from './module/Library/Library';
import { defineCustomMetadataEntries } from './settings/CustomMetadataSettings';

export const settings = async () => {
    const assetSubmissionRequests = await AssetSubmission.getAssetSubmissionRequests();
    const libraryIds = assetSubmissionRequests.map((submission) => submission.projectId);
    const libraries = await queryLibrariesByIds(libraryIds);
    return defineSettings({
        basics: [
            {
                id: 'assetSubmission',
                type: 'dropdown',
                label: 'Destination library',
                info: 'You can choose from only libraries which allow an external asset upload. You can allow this in library settings.',
                size: DropdownSize.Large,
                placeholder: 'Choose a Submission Request',
                choices: async () => {
                    return assetSubmissionRequests.map((submission) => ({
                        value: submission.projectId,
                        label: submission.title,
                    }));
                },
            },
        ],
        'Custom Metadata': defineCustomMetadataEntries(libraries),
        Card: [
            {
                id: 'buttonText',
                type: 'input',
                label: 'Button Text',
                defaultValue: 'New Submission',
                placeholder: 'Button Label',
            },
        ],
        Form: [
            {
                id: 'disclaimer',
                type: 'switch',
                defaultValue: true,
                info: 'Show or Hide the disclaimer Notice',
                label: 'Disclaimer',
            },
        ],
        Metadata: [
            {
                id: 'description',
                type: 'switch',
                defaultValue: false,
                label: 'Description',
            },
            {
                id: 'creator',
                type: 'switch',
                defaultValue: false,
                label: 'Creator',
            },
            {
                id: 'copyrightStatus',
                type: 'switch',
                defaultValue: false,
                label: 'CopyrightStatus',
            },
            {
                id: 'copyrightNotice',
                type: 'switch',
                defaultValue: false,
                label: 'CopyrightNotice',
            },
        ],
    });
};
