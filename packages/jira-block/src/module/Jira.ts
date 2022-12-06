/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getIssueUrl = (hostName: string) => `${hostName}/rest/api/3/issue`;
export const generateTicketMarkup = ({ jiraProjectName, title, guidelineUrl, description, username }: any) => ({
    fields: {
        project: {
            key: jiraProjectName,
        },
        summary: title,
        description: {
            type: 'doc',
            version: 1,
            content: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            text: `Guideline url: ${guidelineUrl}`,
                            type: 'text',
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            text: description,
                            type: 'text',
                        },
                    ],
                },
                {
                    type: 'paragraph',
                    content: [
                        {
                            text: `User: ${username}`,
                            type: 'text',
                        },
                    ],
                },
            ],
        },
        issuetype: {
            name: 'Task',
        },
    },
});
