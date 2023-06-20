/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from '@frontify/guideline-blocks-settings';
import type { FC } from 'react';
import React from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Settings } from '../../types';
import { RichText } from './RichText';

export const ModalHeadline: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);

    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { modalcontent } = blockSettings;
    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });

    return (
        <RichText
            isEditing={isEditing}
            appBridge={appBridge}
            content={modalcontent}
            onTextChange={onTextChange}
            defaultValue={''}
            placeholder={'note / description'}
        />
    );
};
