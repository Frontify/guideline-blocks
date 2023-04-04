/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconLink, IconSize, getHotkeyByPlatform, getTooltip } from '@frontify/fondue';
import { PluginButtonProps } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/types';
import { LinkToolbarButton } from '@udecode/plate';
import React from 'react';

export const LinkButton = ({ id }: PluginButtonProps) => (
    <div data-plugin-id={id}>
        <LinkToolbarButton
            tooltip={getTooltip(`Link\n${getHotkeyByPlatform('Ctrl+K')}`)}
            icon={
                <span className="tw-p-2 tw-h-8 tw-justify-center tw-items-center tw-flex">
                    <IconLink size={IconSize.Size16} />
                </span>
            }
            classNames={{
                root: 'tw-ml-0.5 !tw-text-text-weak hover:!tw-bg-box-selected hover:!tw-text-box-selected-inverse hover:tw-rounded',
                active: '!tw-bg-box-selected tw-rounded !tw-text-box-selected-inverse',
            }}
            styles={{ root: { width: '24px', height: '24px' } }}
            actionHandler="onMouseDown"
        />
    </div>
);
