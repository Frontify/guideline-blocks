/* (c) Copyright Frontify Ltd., all rights reserved. */

import { joinClassNames, textAndBgColor, textAndBgColorHover } from '@frontify/guideline-blocks-shared';
import { AddItemButtonProps } from '../types';

const AddItemButton = ({ onClick, label, icon, secondaryLabel }: AddItemButtonProps) => (
    <button
        className={joinClassNames([
            'tw-font-body tw-relative tw-text-[14px] tw-text-text-weak tw-border tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-gap-3 tw-w-full [&:not(:first-child)]:tw-border-l-0 first:tw-rounded-tl-[4px] first:tw-rounded-bl-[4px] last:tw-rounded-tr-[4px] last:tw-rounded-br-[4px]',
            textAndBgColor,
            textAndBgColorHover,
        ])}
        onClick={onClick}
    >
        <div>{icon}</div>
        <div className="tw-flex tw-flex-col tw-items-start">
            <div className="tw-font-medium">{label}</div>
            {secondaryLabel && <div className="tw-font-normal">{secondaryLabel}</div>}
        </div>
    </button>
);

export default AddItemButton;
