/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextInputType, defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    main: [],
    basics: [
        {
            id: 'jiraRestEndpointUrl',
            type: 'input',
            label: 'Jira Endpoint Url',
        },
        {
            id: 'jiraProjectName',
            type: 'input',
            label: 'Jira Projekt Key',
        },
    ],
    security: [
        {
            id: 'jiraEmail',
            type: 'input',
            label: 'Jira e-mail address',
        },
        {
            id: 'jiraAuthToken',
            type: 'input',
            inputType: TextInputType.Password,
            label: 'Jira Project Key (Generate at https://id.atlassian.com/manage-profile/security)',
        },
    ],
});
