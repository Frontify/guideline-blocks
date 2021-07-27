import { ReactElement, useState } from 'react';
import { Editor } from '@frontify/frontify-cli/types';
import css from './styles.module.css';
import { Color } from './Color';
import ColorElement from './ColorElement';
import { BlockSettings } from './BlockSettings';
import { ColorScaleSize } from './ColorScaleSize';

interface Props {
    editor: Editor;
    blockSettings: BlockSettings;
}

export default function ColorScale(props: Props): ReactElement {
    const [editingEnabled, editingEnabledToggled] = useState<boolean>(props.editor.editingEnabled);
    props.editor.onEditingEnabledToggled = (value) => editingEnabledToggled(value);

    const [colors, setColors] = useState<Color[]>([
        { id: 1, hex: '#CC2C48', name: 'Red 1' },
        { id: 2, hex: '#FF375A', name: 'Red 2' },
        { id: 3, hex: '#FF8066', name: 'Red 3' },
    ]);

    const getSizeClass = () => {
        switch (props.blockSettings.size) {
            case ColorScaleSize.Small:
                return css.colorsSmall;

            case ColorScaleSize.Large:
                return css.colorsLarge;

            case ColorScaleSize.Medium:
            default:
                return css.colorsMedium;
        }
    };

    const colorClasses = [css.colors, getSizeClass()];

    const addColorAfter = (index: number, addedColor: Color): void => {
        const updatedColors: Color[] = [];

        colors.forEach((c, i) => {
            updatedColors.push(c);
            if (i === index) {
                updatedColors.push(addedColor);
            }
        });

        setColors(updatedColors);
    };

    return (
        <div className={colorClasses.join(' ')}>
            {colors.map((color, index) => (
                <div className={css.color} key={`color-${color.id}`}>
                    <ColorElement
                        blockSettings={props.blockSettings}
                        color={color}
                        editingEnabled={editingEnabled}
                        index={index}
                        onAddColor={(addedColor) => addColorAfter(index, addedColor)}
                    ></ColorElement>
                </div>
            ))}
        </div>
    );
}
