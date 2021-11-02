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
    spacing: boolean;
    spacingValue: string;
    doColor: string;
    dontColor: string;
    layout: DoDontLayout;
    style: DoDontStyle;
    spacingChoice: DoDontSpacing;
    items: any;
};

const layoutClasses: Record<DoDontLayout, string> = {
    [DoDontLayout.SideBySide]: 'tw-grid',
    [DoDontLayout.Stacked]: 'tw-grid tw-grid-flow-col tw-grid-rows-2',
};

const spacingClasses: Record<DoDontSpacing, string> = {
    [DoDontSpacing.Small]: 'tw-gap-4',
    [DoDontSpacing.Medium]: 'tw-gap-6',
    [DoDontSpacing.Large]: 'tw-gap-8',
};

const DosDontsBlock: FC<DosDontsBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const {
        items,
        columns = 2,
        spacing = false,
        spacingValue = '',
        doColor = '#00C8A5',
        dontColor = '#FF375A',
        layout = DoDontLayout.SideBySide,
        style = DoDontStyle.Icons,
        spacingChoice = DoDontSpacing.Medium,
    } = blockSettings;

    const saveItem = (itemKey: number, value: string, type: DoDontContent) => {
        const existingItem = items?.[itemKey] || null;
        const newItem = {
            ...existingItem,
            [type]: value,
        };

        setBlockSettings({
            ...blockSettings,
            items: {
                ...items,
                [itemKey]: newItem,
            },
        });
    };

    let numberOfItems = 4;
    if (layout === DoDontLayout.Stacked) {
        if (columns === 1) {
            numberOfItems = 2;
        }
        if (columns === 3) {
            numberOfItems = 6;
        }
        if (columns === 4) {
            numberOfItems = 8;
        }
    }
    if (layout === DoDontLayout.SideBySide) {
        if (columns === 1) {
            numberOfItems = 2;
        }
    }

    return (
        <div
            className={`${layoutClasses[layout]} tw-grid-cols-${columns} ${!spacing && spacingClasses[spacingChoice]}`}
            style={spacing ? { gap: spacingValue } : {}}
        >
            {[...Array(numberOfItems)].map((_, i) => {
                i * i;
                return (
                    <DoDontItem
                        key={i}
                        itemKey={i}
                        saveItem={saveItem}
                        content={
                            blockSettings.items && blockSettings.items[i] !== 'undefined' ? blockSettings.items[i] : {}
                        }
                        type={i % 2 ? DoDontType.Dont : DoDontType.Do}
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
