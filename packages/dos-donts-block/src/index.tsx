/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useEffect } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { DoDontType, DoDontStyle, DoDontLayout, DoDontSpacing, DoDontContent } from './types';
import { DoDontItem, ItemProps } from './DoDontItem';
import { DO_COLOR_DEFAULT_VALUE, DONT_COLOR_DEFAULT_VALUE } from './settings';

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
    items: Pick<ItemProps, 'id' | 'title' | 'body'>[];
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
        doColor = { rgba: DO_COLOR_DEFAULT_VALUE },
        dontColor = { rgba: DONT_COLOR_DEFAULT_VALUE },
        layout = DoDontLayout.SideBySide,
        style = DoDontStyle.Icons,
        spacingChoice = DoDontSpacing.Medium,
    } = blockSettings;

    const setItems = (numberOfItems: number) => {
        let updatedItems = items;

        // Check whether to add or remove items
        if (updatedItems.length - numberOfItems < 0) {
            for (let index = updatedItems.length; index < numberOfItems; index++) {
                updatedItems.push({ id: index, [DoDontContent.Title]: '', [DoDontContent.Body]: '' });
            }
        } else {
            updatedItems = updatedItems.slice(0, numberOfItems);
        }

        setBlockSettings({
            ...blockSettings,
            items: updatedItems,
        });
    };

    const saveItem = (id: number, value: string, type: DoDontContent) => {
        const updatedItems = items;
        const existingItemIndex = items.findIndex((item) => item.id === id);
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], [type]: value };

        setBlockSettings({
            ...blockSettings,
            items: updatedItems,
        });
    };

    useEffect(() => setItems(layout === DoDontLayout.Stacked ? columns * 2 : 2), [layout, columns]);

    return (
        <div
            className={`tw-grid ${
                layout === DoDontLayout.Stacked
                    ? `tw-grid-flow-col tw-grid-rows-2 tw-grid-cols-${columns}`
                    : 'tw-grid-cols-2'
            } ${!isCustomSpacing && spacingClasses[spacingChoice]}`}
            style={isCustomSpacing ? { gap: spacingValue } : {}}
        >
            {items.map((_, index) => {
                const item = items.find(({ id }) => id === index);
                return (
                    <DoDontItem
                        key={index}
                        id={index}
                        saveItem={saveItem}
                        title={item?.[DoDontContent.Title]}
                        body={item?.[DoDontContent.Body]}
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
