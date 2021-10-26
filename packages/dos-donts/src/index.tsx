/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { ReactElement, FC } from 'react';
import { RichTextEditor, IconApprove, IconRejectCircle, IconSize } from '@frontify/arcade';
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

const Item: FC<ItemProps> = ({ type, style, doColor, dontColor }) => {
    const headingStyles = {
        color: type === DoDontType.Do ? doColor : dontColor,
    };

    const dividerStyles = {
        backgroundColor: type === DoDontType.Do ? doColor : dontColor,
    };

    return (
        <div>
            <div style={headingStyles} className="tw-flex tw-content-center">
                {style === DoDontStyle.Icons && (
                    <div className="tw-mr-2">
                        {type === DoDontType.Do && <IconApprove size={IconSize.Size24} />}
                        {type === DoDontType.Dont && <IconRejectCircle size={IconSize.Size24} />}
                    </div>
                )}
                <RichTextEditor placeholder="Add title" />
            </div>
            {style === DoDontStyle.Underline && (
                <hr style={dividerStyles} className="tw-w-full tw-my-4 tw-h-1 tw-border-none tw-rounded" />
            )}
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

    const { columns, spacing, spacingValue, doColor, dontColor } = blockSettings;
    const { layout }: { layout: DoDontLayout } = blockSettings;
    const { style }: { style: DoDontStyle } = blockSettings;
    const { spacingChoice }: { spacingChoice: DoDontSpacing } = blockSettings;

    return (
        <div
            className={`tw-grid tw-grid-cols-${columns} ${
                spacing ? `tw-gap-[${spacingValue}]` : spacingClasses[spacingChoice]
            }`}
        >
            <Item type={DoDontType.Do} style={style} doColor={doColor} dontColor={dontColor} />
            <Item type={DoDontType.Dont} style={style} doColor={doColor} dontColor={dontColor} />
            {(columns === 3 || columns === 4) && (
                <Item type={DoDontType.Do} style={style} doColor={doColor} dontColor={dontColor} />
            )}
            {columns === 4 && <Item type={DoDontType.Dont} style={style} doColor={doColor} dontColor={dontColor} />}
        </div>
    );
};

export default DosDontsBlock;
