/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { joinClassNames } from '@frontify/guideline-blocks-shared';
import { FC, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { DoDontItem } from './DoDontItem';
import { DONT_COLOR_DEFAULT_VALUE, DO_COLOR_DEFAULT_VALUE } from './settings';
import {
    DoDontLayout,
    DoDontSpacing,
    DoDontStyle,
    DoDontType,
    Item,
    Settings,
    columnsClasses,
    spacingValues,
} from './types';

export const DosDontsBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

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
            items: [...updatedItems],
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setItems(layout === DoDontLayout.Stacked ? columns * 2 : 2), [layout, columns]);

    return (
        <div
            data-test-id="dos-donts-block"
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
                        editing={isEditing}
                    />
                );
            })}
        </div>
    );
};
