/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from '@frontify/guideline-blocks-settings';
import type { FC } from 'react';
import React from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichTextEditor } from '@frontify/guideline-blocks-shared';
import { Settings } from '../../types';

export const ModalHeadline: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);

    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { modalcontent } = blockSettings;
    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });

    return (
        <RichTextEditor
            id={appBridge.getBlockId().toString()}
            isEditing={isEditing}
            value={modalcontent}
            placeholder={'note / description'}
            onTextChange={onTextChange}
            onBlur={onTextChange}
        />
    );
};
