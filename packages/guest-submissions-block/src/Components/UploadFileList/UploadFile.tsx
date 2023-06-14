/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCross20, LegacyStack, LoadingCircle, LoadingCircleSize, LoadingCircleStyle, Text } from '@frontify/fondue';
import React from 'react';
import { getMimeTypeIcon } from './helper';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { Status } from '../../module/FileUpload/Contract/Status';
import { UploadFileProps } from './type';

export const UploadFile = ({ type, name, identifier, status, last, onDelete }: UploadFileProps) => {
    return (
        <li
            className={joinClassNames([
                'tw-flex tw-justify-between tw-items-center tw-pt-4 tw-pb-4',
                !last && 'tw-border-b tw-border-[#08080826] ',
            ])}
        >
            <LegacyStack padding="none" spacing="s" align="center">
                {status === Status.PENDING ? (
                    <LoadingCircle size={LoadingCircleSize.Small} style={LoadingCircleStyle.Progress} />
                ) : (
                    getMimeTypeIcon(type)
                )}
                <Text as="p" color="weak" overflow="visible" size="medium" weight="strong">
                    {name}
                </Text>
            </LegacyStack>
            <div className="tw-cursor-pointer" onClick={() => onDelete(identifier)}>
                <IconCross20 />
            </div>
        </li>
    );
};
