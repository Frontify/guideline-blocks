/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import dayjs from 'dayjs';

type NoteHeaderProps = {
    name: string;
    avatar: string;
    hasAvatarName: boolean;
    hasDateEdited: boolean;
    dateEdited: Date;
    useLightText: boolean;
};

export const NoteHeader: FC<NoteHeaderProps> = ({
    name,
    avatar,
    hasAvatarName,
    hasDateEdited,
    dateEdited,
    useLightText,
}) => (
    <div className="tw-flex tw-items-center tw-space-x-4">
        {hasAvatarName && avatar && <img src={avatar} width="32" height="32" className="tw-rounded-full" />}
        <div className="tw-flex tw-flex-col tw-text-s">
            {hasAvatarName && <span className={useLightText ? 'tw-text-white' : 'tw-text-black'}>{name}</span>}
            {hasDateEdited && dateEdited && (
                <span className={useLightText ? 'tw-text-white tw-opacity-60' : 'tw-text-black-60'}>
                    Last edited on {dayjs(dateEdited).format('DD/MM/YYYY, HH:mm:ss')}
                </span>
            )}
        </div>
    </div>
);
