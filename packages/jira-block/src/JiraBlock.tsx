/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useState } from 'react';
import { useBlockSettings } from '@frontify/app-bridge';
import {
    Button,
    ButtonEmphasis,
    ButtonStyle,
    Flyout,
    FlyoutPlacement,
    FormControl,
    TextInput,
    Textarea,
} from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Settings } from './types';

export const JiraBlock = ({ appBridge }: BlockProps): ReactElement => {
    // const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { jiraRestEndpointUrl, jiraEmail, jiraAuthToken } = blockSettings;

    const [open, setOpen] = useState(false);
    const [jiraProjectName, setJiraProjectName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [guidelineUrl, setGuidelineUrl] = useState(window.location.href);

    const dummyFetch = async () => {
        const jiraPayload = {
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
                    ],
                },
                issuetype: {
                    name: 'Task',
                },
            },
        };

        const jiraUrl = `${jiraRestEndpointUrl}/rest/api/3/issue`;
        const authentication = btoa(unescape(encodeURIComponent(`${jiraEmail}:${jiraAuthToken}`)));
        const body = {
            payload: JSON.stringify(jiraPayload),
            url: jiraUrl,
            authorization: authentication,
        };

        try {
            const res = await fetch('http://localhost:3000', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(body),
            });

            const jiraResponse = await res.json();
            console.debug('Created item: ', jiraResponse);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="tw-flex" data-test-id="jira-block">
            <Flyout
                offset={5}
                onOpenChange={setOpen}
                onCancel={() => setOpen(false)}
                isOpen={open}
                placement={FlyoutPlacement.Bottom}
                trigger={
                    <span className="tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70">
                        <div>Ticket</div>
                    </span>
                }
            >
                <div className="tw-flex tw-flex-col tw-gap-y-8 tw-p-8 tw-gap-4">
                    <FormControl
                        label={{
                            children: 'Guideline Reference',
                            htmlFor: 'input-id',
                        }}
                    >
                        <TextInput id={'input-id'} onChange={setGuidelineUrl} value={guidelineUrl} disabled={true} />
                    </FormControl>{' '}
                    <FormControl
                        label={{
                            children: 'Jira Project Name',
                            htmlFor: 'input-id',
                        }}
                    >
                        <TextInput id={'input-id'} onChange={setJiraProjectName} value={jiraProjectName} />
                    </FormControl>
                    <FormControl
                        label={{
                            children: 'Ticket Titel',
                            htmlFor: 'title-id',
                        }}
                    >
                        <TextInput id="title-id" value={title} onChange={setTitle} />
                    </FormControl>
                    <FormControl
                        label={{
                            children: 'Description',
                            htmlFor: 'textarea-id',
                        }}
                    >
                        <Textarea
                            id={'textarea-id'}
                            placeholder="This is a placeholder"
                            value={description}
                            onInput={setDescription}
                        />
                    </FormControl>
                    <Button
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Strong}
                        onClick={() => {
                            dummyFetch();
                            setOpen(false);
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Flyout>
        </div>
    );
};
