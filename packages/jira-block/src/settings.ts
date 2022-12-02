/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    main: [],
    basics: [
        {
            id: 'jiraProjectKey',
            type: 'input',
            label: 'Jira Project Key',
        },
        {
            id: 'jiraProjectId',
            type: 'input',
            label: 'Jira Project Id',
        },
    ],
});
