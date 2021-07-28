import { ReactElement, useState } from 'react';
import { Editor, HttpClient, Context } from '@frontify/frontify-cli/types';
import { Color } from './Color';
import { BlockSettings } from './BlockSettings';
import ColorList from './ColorList';
import Empty from './Empty';

interface Props {
    blockId: number;
    editor: Editor;
    blockSettings: BlockSettings;
    updateSettings: (updatedBlockSettings: BlockSettings) => void;
    httpClient: HttpClient;
    context: Context;
}

export default function ColorScale(props: Props): ReactElement {
    console.log('render');

    const [editingEnabled, editingEnabledToggled] = useState<boolean>(props.editor.editingEnabled);
    props.editor.onEditingEnabledToggled = (value) => editingEnabledToggled(value);

    const [colors, setColors] = useState<Color[]>([
        { id: 1, hex: 'CC2C48', name: 'Red 1' },
        { id: 2, hex: 'FF375A', name: 'Red 2' },
        { id: 3, hex: 'FF8066', name: 'Red 3' },
    ]);
    const update = (updatedColors: Color[]): void => console.log('update', updatedColors);

    const addColorAfter = (index: number, addedColor: Color): void => {
        const updatedColors: Color[] = [];

        colors.forEach((c, i) => {
            updatedColors.push(c);
            if (i === index) {
                updatedColors.push(addedColor);
            }
        });

        setColors(updatedColors);
        update(updatedColors);
    };

    const removeColorAt = (index: number): void => {
        const updatedColors: Color[] = [];

        colors.forEach((c, i) => {
            if (i !== index) {
                updatedColors.push(c);
            }
        });

        setColors(updatedColors);
        update(updatedColors);
    };

    return (
        <div>
            {colors.length > 0 ? (
                <ColorList
                    addColorAfter={addColorAfter}
                    removeColorAt={removeColorAt}
                    blockSettings={props.blockSettings}
                    editingEnabled={editingEnabled}
                    colors={colors}
                ></ColorList>
            ) : (
                <Empty editingEnabled={editingEnabled}></Empty>
            )}
        </div>
    );
}
