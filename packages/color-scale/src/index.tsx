import { ReactElement, useState } from 'react';
import { Editor, HttpClient, Context } from '@frontify/frontify-cli/types';
import { Color } from './Color';
import { BlockSettings } from './BlockSettings';
import ColorList from './ColorList';
import Empty from './Empty';
import AddButton from './AddButton';
import { defaultColorWidth } from './Constants';
import { ColorApiResponse } from './ApiResponse';

interface Props {
    blockId: number;
    editor: Editor;
    blockSettings: BlockSettings;
    updateSettings: (updatedBlockSettings: BlockSettings) => void;
    httpClient: HttpClient;
    context: Context;
}

export default function ColorScale(props: Props): ReactElement {
    const [editingEnabled, editingEnabledToggled] = useState<boolean>(props.editor.editingEnabled);
    props.editor.onEditingEnabledToggled = (value) => editingEnabledToggled(value);

    const [colors, setColors] = useState<Color[]>(props.blockSettings.colors || []);

    const update = (updatedColors: Color[]): void => {
        props.updateSettings({
            colors: updatedColors,
            size: props.blockSettings.size,
            style: props.blockSettings.style,
        });
    };

    const appendColor = (addedColor: ColorApiResponse): void => {
        const updatedColors: Color[] = colors.map((color) => color);

        updatedColors.push({
            id: Number(addedColor.id),
            width: defaultColorWidth,
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
                    removeColorAt={removeColorAt}
                    blockSettings={props.blockSettings}
                    editingEnabled={editingEnabled}
                    colors={colors}
                />
            ) : (
                <Empty editingEnabled={editingEnabled} />
            )}
            {editingEnabled ? (
                <AddButton projectId={props.context.project.id} httpClient={props.httpClient} onConfirm={appendColor} />
            ) : (
                ''
            )}
        </div>
    );
}
