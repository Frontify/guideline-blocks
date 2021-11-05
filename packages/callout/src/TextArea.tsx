/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative, useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { ChangeEvent, FC } from 'react';
import { BlockSettings } from './types';

type TextAreaProps = {
    className: string;
    appBridge: AppBridgeNative;
};

export const TextArea: FC<TextAreaProps> = ({ className, appBridge }) => {
    const [{ textValue }, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const isEditing = useEditorState();

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBlockSettings({ textValue: e.target.value } as BlockSettings); // TODO use Partial<BlockSettings> when new version of app-bridge is available
    };

    return isEditing ? (
        <textarea className={className} onChange={onTextAreaChange} value={textValue} />
    ) : (
        <span>{textValue}</span>
    );
};
