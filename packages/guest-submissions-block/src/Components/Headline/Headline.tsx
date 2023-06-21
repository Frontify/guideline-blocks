/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from '@frontify/guideline-blocks-settings';
import type { FC } from 'react';
import React from 'react';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { RichText } from './RichText';
import { PLACEHOLDER } from './constant';
import { Settings } from '../../types';
import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

const DEFAULT_VALUE =
    '[{"type":"heading3","children":[{"text":"Title of the submission block","textStyle":"heading3"}]},{"type":"p","children":[{"text":"Subtitle of the submission block","textStyle":"p"}]}]';

export const Headline: FC<BlockProps> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);

    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { content } = blockSettings;
    const onTextChange = (value: string) => value !== blockSettings.content && setBlockSettings({ content: value });

    return (
        <RichText
            isEditing={isEditing}
            appBridge={appBridge}
            content={content}
            onTextChange={onTextChange}
            defaultValue={DEFAULT_VALUE}
            placeholder={PLACEHOLDER}
        />
    );
};
