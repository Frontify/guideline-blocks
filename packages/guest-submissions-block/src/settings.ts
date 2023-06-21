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
                label: 'Library',
                info: 'Can’t find your library? Turn on “Asset Submissions” in the settings of your library.',
                size: DropdownSize.Large,
                placeholder: 'Choose a library...',
                choices: async () => {
                    return assetSubmissionRequests.map((submission) => ({
                        value: submission.projectId,
                        label: submission.title,
                    }));
                },
            },
        ],
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
                info: 'Turn on the disclaimer to require users to accept it before submitting the form.',
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
        'Custom Metadata': defineCustomMetadataEntries(libraries),
    });
};
