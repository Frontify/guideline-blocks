/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import './styles.css';
import { FC, useEffect, useMemo } from 'react';
import { Color, RichTextEditor } from '@frontify/arcade';
import { AppBridgeNative, useEditorState, useBlockSettings } from '@frontify/app-bridge';
import { DEFAULT_COLUMN_GUTTER, DEFAULT_COLUMN_NUMBER, PLACEHOLDER, TIME_TO_DEBOUNCE } from './constant';
import { RawDraftContentState } from 'draft-js';
import { cloneDeep, debounce } from 'lodash-es';
import { merge } from './utilities';

type Props = {
    appBridge: AppBridgeNative;
};

type Settings = {
    columnGutterCustom: string;
    columnGutterSimple: string;
    columnNumber: number;
    isColumnGutterCustom: boolean;
    content?: RawDraftContentState[];
    'color-input-in-sidebar': Color;
};

const Text: FC<Props> = ({ appBridge }) => {
    const isEditing = useEditorState();
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    useEffect(() => {
        if (!Object.keys(blockSettings).length) {
            const newSettings = cloneDeep(blockSettings) as Settings;
            newSettings.columnGutterSimple = DEFAULT_COLUMN_GUTTER;
            newSettings.columnNumber = DEFAULT_COLUMN_NUMBER;
            newSettings.content = Array(blockSettings.columnNumber ?? DEFAULT_COLUMN_NUMBER);
            setBlockSettings(newSettings);
        }
    }, []);

    const onTextChange = (value: RawDraftContentState, index: number) => {
        const newSettings = cloneDeep(blockSettings) as Settings;
        if (!newSettings.content) {
            throw new Error('The block has been not correctly setup during initialization.');
        }

        newSettings.content[index] = value;
        setBlockSettings(newSettings);
    };

    return (
        <div
            className={merge(['guideline-text'])}
            style={{
                gap: blockSettings.isColumnGutterCustom
                    ? blockSettings.columnGutterCustom
                    : blockSettings.columnGutterSimple,
            }}
        >
            {Array(blockSettings.columnNumber).map((_, index) => {
                const editorValue = useMemo(() => {
                    if (blockSettings.content?.[index] && 'blocks' in blockSettings.content[index]) {
                        return {
                            blocks: blockSettings.content[index].blocks,
                            entityMap: blockSettings.content[index].entityMap,
                        };
                    }
                    return undefined;
                }, [index, blockSettings.content]);

                return (
                    <RichTextEditor
                        key={index}
                        value={editorValue as RawDraftContentState}
                        placeholder={PLACEHOLDER}
                        readonly={!isEditing}
                        onTextChange={debounce(
                            (value: RawDraftContentState) => onTextChange(value, index),
                            TIME_TO_DEBOUNCE
                        )}
                    />
                );
            })}
        </div>
    );
};

export default Text;
