/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Settings } from '../types';
import { RichText } from '../Components/Headline/RichText';
import { IconCheckMark32, Stack, Text } from '@frontify/fondue';

const DEFAULT_SUCCESS_MESSAGE = '[{"type":"p","children":[{"text":"Thanks for submitting the files."}]}]';
export const SuccessPage: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);

    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { successContent } = blockSettings;
    const { uploadedFiles, successContent: successContent1 } = blockSettings;
    const onTextChange = (value: string) => value !== successContent1 && setBlockSettings({ successContent: value });

    console.log(successContent);
    return (
        <div className="tw-bg-base-alt tw-rounded tw-p-8">
            <Stack direction={'row'} alignItems={'center'}>
                <IconCheckMark32 />
                <Stack direction={'column'}>
                    <Text as="p" color="default" overflow="visible" size="large" weight="strong">
                        {uploadedFiles} file{uploadedFiles && uploadedFiles > 1 ? 's' : ''} submitted successfully!
                    </Text>
                    <RichText
                        isEditing={isEditing}
                        appBridge={appBridge}
                        content={successContent}
                        onTextChange={onTextChange}
                        defaultValue={DEFAULT_SUCCESS_MESSAGE}
                        placeholder={'Add Here your personlized Succes Message'}
                    />
                </Stack>
            </Stack>
        </div>
    );
};
