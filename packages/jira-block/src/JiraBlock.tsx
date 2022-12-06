/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, useState } from 'react';
import { useBlockSettings } from '@frontify/app-bridge';
import { Flyout, FormControl, TextInput, Textarea } from '@frontify/fondue';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Settings } from './types';
import { generateTicketMarkup, getIssueUrl } from './module/Jira';
import { generateBase64Encoding } from './utility/Uri';

export const JiraBlock = ({ appBridge }: BlockProps): ReactElement => {
    // const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { jiraRestEndpointUrl, jiraEmail, jiraAuthToken, jiraProjectName } = blockSettings;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [username] = useState('Hans Test');
    const [guidelineUrl] = useState(window.location.href);

    const sendToJira = async () => {
        const jiraUrl = getIssueUrl(jiraRestEndpointUrl);
        const authentication = generateBase64Encoding(`${jiraEmail}:${jiraAuthToken}`);
        const body = {
            payload: JSON.stringify(
                generateTicketMarkup({
                    jiraProjectName,
                    title,
                    guidelineUrl,
                    description,
                    username,
                })
            ),
            url: jiraUrl,
            authorization: authentication,
        };

        // Todo: here we can encode everything with public key -> then decode with private in the lambda

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
            setOpen(false);
            cleanup();
            console.debug('Created item: ', jiraResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const cleanup = () => {
        setTitle('');
        setDescription('');
    };

    return (
        <div className="tw-flex" data-test-id="jira-block">
            <Flyout
                onOpenChange={setOpen}
                onCancel={() => {
                    setOpen(false);
                }}
                onConfirm={() => {
                    sendToJira();
                    setOpen(false);
                }}
                isOpen={open}
                trigger={
                    <span className="tw-flex tw-h-full tw-items-center tw-p-1 tw-rounded tw-bg-black-20 hover:tw-bg-black-30 dark:tw-bg-black-80 dark:hover:tw-bg-black-70">
                        <div>Ticket</div>
                    </span>
                }
            >
                <div className="tw-flex tw-flex-col tw-gap-y-8 tw-p-8 tw-gap-4">
                    <FormControl
                        label={{
                            children: 'Ticket Title',
                            htmlFor: 'title-id',
                        }}
                    >
                        <TextInput id="title-id" value={title} onChange={setTitle} />
                    </FormControl>
                    <FormControl
                        label={{
                            children: 'Ticket Decriptions',
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
                    <FormControl
                        label={{
                            children: 'Guideline Page Name',
                            htmlFor: 'input-id',
                        }}
                        disabled={true}
                    >
                        <TextInput id={'input-id'} value={guidelineUrl} disabled={true} />
                    </FormControl>
                    <FormControl
                        label={{
                            children: 'Username',
                            htmlFor: 'input-id',
                        }}
                        disabled={true}
                    >
                        <TextInput id={'input-id'} value={username} disabled={true} />
                    </FormControl>
                </div>
            </Flyout>
        </div>
    );
};
