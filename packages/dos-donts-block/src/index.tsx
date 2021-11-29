/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import '@frontify/arcade/style';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { DoDontItem } from './DoDontItem';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE } from './settings';
import {
    columnsClasses,
    DoDontLayout,
    DoDontSpacing,
    DoDontStyle,
    DoDontType,
    DosDontsBlockProps,
    Item,
    Settings,
    spacingValues,
} from './types';

const DosDontsBlock: FC<DosDontsBlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const {
        items = [],
        columns = 2,
        isCustomSpacing = false,
        spacingValue = '',
        doColor = DO_COLOR_DEFAULT_VALUE,
        dontColor = DONT_COLOR_DEFAULT_VALUE,
        layout = DoDontLayout.SideBySide,
        style = DoDontStyle.Icons,
        spacingChoice = DoDontSpacing.Medium,
    } = blockSettings;
    const [localItems, setLocalItems] = useState<Item[]>(items);

    const setItems = (numberOfItems: number) => {
        let updatedItems = localItems;
        // Check whether to add or remove items
        if (updatedItems.length - numberOfItems < 0) {
            for (let index = updatedItems.length; index < numberOfItems; index++) {
                updatedItems.push({ id: index, title: '', body: '' });
            }
        } else {
            updatedItems = updatedItems.slice(0, numberOfItems);
        }
        setLocalItems([...updatedItems]);
    };

    const saveItem = (id: number, value: string, type: 'title' | 'body') => {
        const updatedItems = localItems;
        const existingItemIndex = localItems.findIndex((item) => item.id === id);
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], [type]: value };

        setBlockSettings({
            ...blockSettings,
            items: [...updatedItems],
        });
    };

    useEffect(() => setItems(layout === DoDontLayout.Stacked ? columns * 2 : 2), [layout, columns]);

    return (
        <div
            className={joinClassNames([
                'tw-grid tw-gap-y-8',
                layout === DoDontLayout.Stacked
                    ? `tw-grid-flow-col tw-grid-rows-2 ${columnsClasses[columns]}`
                    : 'tw-grid-cols-2',
            ])}
            style={{ columnGap: isCustomSpacing ? spacingValue : spacingValues[spacingChoice] }}
        >
            {localItems.map((_, index) => {
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
