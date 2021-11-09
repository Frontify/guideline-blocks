/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { ChangeEvent, FC } from 'react';
import { BlockSettings, Type, typeMap } from './types';

type EditableTextProps = {
    type: Type;
    appBridge: AppBridgeNative;
};

export const EditableText: FC<EditableTextProps> = ({ type, appBridge }) => {
    const [{ textValue }, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState();
    const className = `tw-text-white ${typeMap[type]}`;

    const onTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBlockSettings({ textValue: event.target.value });
    };

    return isEditing ? (
        <textarea className={className} onChange={onTextAreaChange} value={textValue} />
    ) : (
        <span>{textValue}</span>
    );
};
