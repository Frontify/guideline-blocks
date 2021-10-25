/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { ReactElement, FC } from 'react';
import { RichTextEditor, IconApprove, IconRejectCircle } from '@frontify/arcade';
import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';
import { DoDontType, DoDontStyle, DoDontLayout, DoDontSpacing } from './types';

type DosDontsBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    backgroundColor: string;
    borderColor: string;
    showBorder: boolean;
};

type ItemProps = {
    type: DoDontType;
    style: DoDontStyle;
};

const Item: FC<ItemProps> = ({ type, style }) => {
    return (
        <div>
            {style === DoDontStyle.Icons && type === DoDontType.Do && <IconApprove />}
            {style === DoDontStyle.Icons && type === DoDontType.Dont && <IconRejectCircle />}
            <h3>Add Title</h3>
            <RichTextEditor placeholder="Add a description" />
        </div>
    );
};

const spacingClasses: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Small]: 'tw-gap-3',
    [DoDontSpacing.Medium]: 'tw-gap-4',
    [DoDontSpacing.Large]: 'tw-gap-6',
};

const DosDontsBlock: FC<DosDontsBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { columns } = blockSettings;
    const { layout }: { layout: DoDontLayout } = blockSettings;
    const { style }: { style: DoDontStyle } = blockSettings;
    const { spacingChoice }: { spacingChoice: DoDontSpacing } = blockSettings;

    return (
        <div className={`tw-grid tw-grid-cols-${columns} ${spacingClasses[spacingChoice]}`}>
            <Item type={DoDontType.Do} style={style} />
            <Item type={DoDontType.Dont} style={style} />
        </div>
    );
};

export default DosDontsBlock;
