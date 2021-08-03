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
    removeColorAt: (index: number) => void;
}

export default function ColorList(props: Props): ReactElement {
    const getColorSizeClass = () => {
        switch (props.blockSettings.size) {
            case ColorScaleSize.Small:
                return css.colorSmall;

            case ColorScaleSize.Large:
                return css.colorLarge;

            case ColorScaleSize.Medium:
            default:
                return css.colorMedium;
        }
    };

    const colorClasses = [css.color, getColorSizeClass()];

    if (props.editingEnabled) {
        colorClasses.push(css.colorResizable);
    }

    return (
        <div className={css.colors}>
            {props.colors.map((color, index) => (
                <div className={colorClasses.join(' ')} style={{ width: color.width }} key={`color-${color.id}`}>
                    <ColorElement
                        blockSettings={props.blockSettings}
                        color={color}
                        editingEnabled={props.editingEnabled}
                        index={index}
                        onRemove={() => props.removeColorAt(index)}
                    />
                </div>
            ))}
        </div>
    );
}
