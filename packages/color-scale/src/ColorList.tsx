import { ReactElement } from 'react';
import { BlockSettings } from './BlockSettings';
import { Color } from './Color';
import ColorElement from './ColorElement';
import { ColorScaleSize } from './ColorScaleSize';
import css from './styles.module.css';

interface Props {
    colors: Color[];
    editingEnabled: boolean;
    blockSettings: BlockSettings;
    addColorAfter: (index: number, color: Color) => void;
    removeColorAt: (index: number) => void;
}

export default function ColorList(props: Props): ReactElement {
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

    return (
        <div className={colorClasses.join(' ')}>
            {props.colors.map((color, index) => (
                <div className={css.color} key={`color-${color.id}`}>
                    <ColorElement
                        blockSettings={props.blockSettings}
                        color={color}
                        editingEnabled={props.editingEnabled}
                        index={index}
                        onAddColor={(addedColor) => props.addColorAfter(index, addedColor)}
                        onRemove={() => props.removeColorAt(index)}
                    ></ColorElement>
                </div>
            ))}
        </div>
    );
}
