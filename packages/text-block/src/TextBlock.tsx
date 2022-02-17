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

    const columnCount = parseInt(blockSettings.columnNumber ?? DEFAULT_COLUMN_NUMBER);

    useEffect(() => {
        const newSettings = cloneDeep(blockSettings) as Settings;
        newSettings.columnGutterSimple ??= DEFAULT_COLUMN_GUTTER;
        newSettings.columnNumber ??= DEFAULT_COLUMN_NUMBER;
        newSettings.content ??= Array(columnCount ?? DEFAULT_COLUMN_NUMBER);

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
            className={`text-block tw-grid ${GRID_CLASSES[columnCount] ?? GRID_CLASSES[DEFAULT_COLUMN_NUMBER]}`}
        >
            {[...Array(columnCount)].map((_, index) => {
                return (
                    <RichTextEditor
                        key={`text-block-editor-${index}`}
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
