/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import './styles.css';
import { FC, useEffect } from 'react';
import { RichTextEditor } from '@frontify/arcade';
import { useEditorState, useBlockSettings } from '@frontify/app-bridge';
import { DEFAULT_COLUMN_GUTTER, DEFAULT_COLUMN_NUMBER, GRID_CLASSES, PLACEHOLDER } from './constant';
import { cloneDeep, isEqual } from 'lodash-es';
import { Props, Settings } from './types';

const Text: FC<Props> = ({ appBridge }) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    useEffect(() => {
        const newSettings = cloneDeep(blockSettings) as Settings;
        newSettings.columnGutterSimple ??= DEFAULT_COLUMN_GUTTER;
        newSettings.columnNumber ??= DEFAULT_COLUMN_NUMBER;
        newSettings.content ??= Array(blockSettings.columnNumber ?? DEFAULT_COLUMN_NUMBER).fill(undefined);

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
            style={{
                gap: blockSettings.isColumnGutterCustom
                    ? blockSettings.columnGutterCustom
                    : blockSettings.columnGutterSimple,
            }}
            className={`tw-grid ${GRID_CLASSES[blockSettings.columnNumber] ?? GRID_CLASSES[DEFAULT_COLUMN_NUMBER]}`}
        >
            {[...Array(blockSettings.columnNumber)].map((_, index) => {
                return (
                    <RichTextEditor
                        key={index}
                        value={blockSettings.content?.[index]}
                        placeholder={PLACEHOLDER}
                        readonly={!isEditing}
                        onTextChange={(value) => onTextChange(value, index)}
                    />
                );
            })}
        </div>
    );
};

export default Text;
