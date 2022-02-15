/* (c) Copyright Frontify Ltd., all rights reserved. */

import './styles.css';
import 'tailwindcss/tailwind.css';
import { FC, useEffect } from 'react';
import isEqual from 'lodash-es/isEqual';
import cloneDeep from 'lodash-es/cloneDeep';
import { RichTextEditor } from '@frontify/arcade';
import { GRID_CLASSES, Props, Settings } from './types';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { DEFAULT_COLUMN_GUTTER, DEFAULT_COLUMN_NUMBER, PLACEHOLDER } from './settings';

export const TextBlock: FC<Props> = ({ appBridge }) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    const columnsCount = Number(blockSettings.columnNumber);

    useEffect(() => {
        const newSettings = cloneDeep(blockSettings) as Settings;
        newSettings.columnGutterSimple ??= DEFAULT_COLUMN_GUTTER;
        newSettings.columnNumber ??= DEFAULT_COLUMN_NUMBER;
        newSettings.content ??= Array(blockSettings.columnNumber ?? DEFAULT_COLUMN_NUMBER).fill('');

        if (!isEqual(newSettings, blockSettings)) {
            setBlockSettings(newSettings);
        }
    }, []);

    const onTextChange = (value: string, index: number) => {
        const newSettings = cloneDeep(blockSettings) as Settings;
        if (newSettings.content) {
            newSettings.content[index] = value;
            setBlockSettings(newSettings);
        }
    };

    return (
        <div
            data-test-id="text-block"
            style={{
                gap: blockSettings.isColumnGutterCustom
                    ? blockSettings.columnGutterCustom
                    : blockSettings.columnGutterSimple,
            }}
            className={`text-block tw-grid ${GRID_CLASSES[columnsCount] ?? GRID_CLASSES[DEFAULT_COLUMN_NUMBER]}`}
        >
            {[...Array(columnsCount)].map((_, index) => {
                return (
                    <RichTextEditor
                        key={index}
                        value={blockSettings.content?.[index]}
                        placeholder={PLACEHOLDER}
                        readonly={!isEditing}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        onTextChange={(value) => onTextChange(value, index)}
                    />
                );
            })}
        </div>
    );
};
