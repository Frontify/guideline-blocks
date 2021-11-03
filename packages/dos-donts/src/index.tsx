/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/arcade/style';
import { FC, useEffect } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { DoDontType, DoDontStyle, DoDontLayout, DoDontSpacing, DoDontContent } from './types';
import { DoDontItem, ItemProps } from './DoDontItem';

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
        doColor = '#00C8A5',
        dontColor = '#FF375A',
        layout = DoDontLayout.SideBySide,
        style = DoDontStyle.Icons,
        spacingChoice = DoDontSpacing.Medium,
    } = blockSettings;

    const setItems = (amountOfItems: number) => {
        let existingItems = items;
        let newItems = [...new Array(amountOfItems)].map((_, index) => {
            return { id: index, [DoDontContent.Title]: '', [DoDontContent.Body]: '' };
        });

        // Merge existing and empty items and remove duplicates by id
        for (let i = 0, l = newItems.length; i < l; i++) {
            for (let j = 0, ll = existingItems.length; j < ll; j++) {
                if (newItems[i].id === existingItems[j].id) {
                    newItems.splice(i, 1, existingItems[j]);
                    break;
                }
            }
        }

        setBlockSettings({
            ...blockSettings,
            items: newItems,
        });
    };

    const saveItem = (id: number, value: string, type: DoDontContent) => {
        let updatedItems = items;
        const existingItemIndex = items.findIndex((item) => item.id === id);
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], [type]: value };

        setBlockSettings({
            ...blockSettings,
            items: updatedItems,
        });
    };

    useEffect(() => {
        const numberOfItems = layout === DoDontLayout.Stacked ? columns * 2 : 2;
        setItems(numberOfItems);
    }, [columns]);

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
                        title={item?.title}
                        body={item?.body}
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
