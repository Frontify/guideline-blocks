/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { UploadFile } from './UploadFile';
import { IconCaretUp16, LoadingCircle, LoadingCircleSize, LoadingCircleStyle, Text } from '@frontify/fondue';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { BackgroundBase } from '../AssetDropzone';
import { BorderShape } from '../styling';
import { Status } from '../../module/FileUpload/Contract/Status';
import { QueryFile } from '../../module/FileUpload/Entity/QueryFile';

type FileUploadListProps = {
    entries: QueryFile[];
    onEntryDeletion: (identifier: string) => void;
};

const CenterWithGap = 'tw-flex tw-justify-center tw-items-end tw-p-[18px] tw-gap-2 tw-cursor-pointer';

export const UploadFileList = ({ entries, onEntryDeletion }: FileUploadListProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const uploadingBar = () =>
        entries.some((item) => item.status === Status.PENDING) ? (
            <>
                <LoadingCircle size={LoadingCircleSize.Small} style={LoadingCircleStyle.Progress} />{' '}
                <Text as="p" color="weak" overflow="visible" size="medium" weight="strong">
                    {entries.length} files uploading
                </Text>
            </>
        ) : (
            <Text as="p" color="weak" overflow="visible" size="medium" weight="strong">
                {entries.length} files ready to be submitted
            </Text>
        );

    const getFileList = () => (
        <>
            {entries.map((entry, index) => (
                <UploadFile
                    status={entry.status}
                    identifier={entry.identifier}
                    type={entry.type}
                    name={entry.name}
                    key={entry.identifier}
                    last={index === entries.length - 1}
                    onDelete={onEntryDeletion}
                />
            ))}
        </>
    );

    return entries.length > 0 ? (
        <div className={joinClassNames([BackgroundBase, BorderShape, 'tw-border-line-xx-strong'])}>
            <div onClick={() => setOpen(!open)}>
                <div className={joinClassNames([CenterWithGap, open && 'tw-border-b tw-border-[#08080826] tw-mx-2'])}>
                    {uploadingBar()}

                    <div
                        className={joinClassNames([
                            !open ? 'tw-rotate-180 tw-transition-all' : 'tw-rotate-0 tw-transition-all',
                        ])}
                    >
                        <IconCaretUp16 />
                    </div>
                </div>
            </div>
            {
                <ul
                    className={joinClassNames([
                        'tw-px-5 tw-overflow-scroll tw-transition-all',
                        open ? 'tw-max-h-[350px]' : 'tw-max-h-[0px]',
                    ])}
                >
                    {getFileList()}
                </ul>
            }
        </div>
    ) : (
        <></>
    );
};
