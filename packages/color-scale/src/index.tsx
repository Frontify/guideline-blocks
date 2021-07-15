import { ReactElement, useState } from 'react';
import { Editor } from '@frontify/frontify-cli/types';
import css from './styles.module.css';
import { Color } from './Color';
import ColorElement from './ColorElement';
import { BlockSettings } from './BlockSettings';

interface Props {
    editor: Editor;
    blockSettings: BlockSettings;
}

export default function ColorScale(props: Props): ReactElement {
    const [editingEnabled, editingEnabledToggled] = useState<boolean>(props.editor.editingEnabled);
    props.editor.onEditingEnabledToggled = (value) => editingEnabledToggled(value);

    const colors: Color[] = [
        { id: 1, hex: '#CC2C48', name: 'Red 1' },
        { id: 2, hex: '#FF375A', name: 'Red 2' },
        { id: 3, hex: '#FF8066', name: 'Red 3' },
    ];

    const addColorAfter = (index: number) => console.log(`Add color after ${index}`);

    const getSizeClass = () => {
        switch (props.blockSettings.size) {
            case 'S':
                return css.colorsSmall;

            case 'L':
                return css.colorsLarge;

            case 'M':
            default:
                return css.colorsMedium;
        }
    };

    const colorClasses = [css.colors, getSizeClass()];

    return (
        <div className={colorClasses.join(' ')}>
            {colors.map((color, index) => (
                <div className={css.color} key={`color-${index}`}>
                    <ColorElement
                        blockSettings={props.blockSettings}
                        color={color}
                        editingEnabled={editingEnabled}
                        index={index}
                        onClick={() => addColorAfter(index)}
                    ></ColorElement>
                </div>
            ))}
        </div>
    );
}
