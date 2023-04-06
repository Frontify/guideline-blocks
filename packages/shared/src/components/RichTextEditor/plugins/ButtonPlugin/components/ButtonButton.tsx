/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconButton16 } from '@frontify/fondue';
import { PluginButtonProps } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/types';
import { getPluginType } from '@udecode/plate';
import React from 'react';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { ButtonToolbarButton } from './ButtonToolbarButton';

export const buttonStyles = { root: { width: '24px', height: '24px' } };

export const ButtonButton = ({ editor, id }: PluginButtonProps) => (
    <div data-plugin-id={id}>
        <ButtonToolbarButton
            type={getPluginType(editor, ELEMENT_BUTTON)}
            icon={
                <span className="tw-p-2 tw-h-8 tw-justify-center tw-items-center tw-flex">
                    <IconButton16 />
                </span>
            }
            styles={buttonStyles}
        />
    </div>
);
