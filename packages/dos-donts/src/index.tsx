/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { DoDontType, DoDontStyle, DoDontLayout, DoDontSpacing, DoDontContent } from './types';

import { DoDontItem } from './DoDontItem';

type DosDontsBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    columns: number;
    isCustomSpacing: boolean;
    spacingValue: string;
    doColor: string;
    dontColor: string;
    layout: DoDontLayout;
    style: DoDontStyle;
    spacingChoice: DoDontSpacing;
    items: any;
};

const spacingClasses: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Small]: 'tw-gap-4',
    [DoDontSpacing.Medium]: 'tw-gap-6',
    [DoDontSpacing.Large]: 'tw-gap-8',
};

const DosDontsBlock: FC<DosDontsBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        items = [],
        columns = 2,
        isCustomSpacing = false,
        spacingValue = '',
        doColor = '#00C8A5',
        dontColor = '#FF375A',
        layout = DoDontLayout.SideBySide,
        style = DoDontStyle.Icons,
        spacingChoice = DoDontSpacing.Medium,
    } = blockSettings;

    const saveItem = (itemKey: number, value: string, type: DoDontContent) => {
        let updatedItems = items;
        const existingItemIndex = items.findIndex((item) => item.key === itemKey);
        if (existingItemIndex === -1) {
            updatedItems.push({ key: itemKey, [type]: value });
        } else {
            updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], [type]: value };
        }

        setBlockSettings({
            ...blockSettings,
            items: updatedItems,
        });
    };

    const numberOfItems = layout === DoDontLayout.Stacked ? columns * 2 : 2;

    return (
        <div
            className={`tw-grid ${
                layout === DoDontLayout.Stacked
                    ? `tw-grid-flow-col tw-grid-rows-2 tw-grid-cols-${columns}`
                    : 'tw-grid-cols-2'
            } ${!isCustomSpacing && spacingClasses[spacingChoice]}`}
            style={isCustomSpacing ? { gap: spacingValue } : {}}
        >
            {[...Array(numberOfItems)].map((_, index) => {
                const title = items.filter((item) => item.key === index)[0].title;
                const body = items.filter((item) => item.key === index)[0].body;
                return (
                    <DoDontItem
                        key={index}
                        itemKey={index}
                        saveItem={saveItem}
                        title={title}
                        body={body}
                        type={index % 2 ? DoDontType.Dont : DoDontType.Do}
                        style={style}
                        doColor={doColor}
                        dontColor={dontColor}
                    />
                );
            })}
        </div>
    );
};

export default DosDontsBlock;
