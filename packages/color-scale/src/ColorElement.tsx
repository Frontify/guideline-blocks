import { ReactElement } from 'react';
import css from 'styles.module.css';
import { BlockSettings } from './BlockSettings';
import { ColorScaleStyle } from './ColorScaleStyle';
import RemoveButton from './RemoveButton';
import { ColorViewModel } from './ColorViewModel';

interface Props {
    blockSettings: BlockSettings;
    color: ColorViewModel;
    index: number;
    editingEnabled: boolean;
    onRemove: () => void;
}

export default function ColorElement(props: Props): ReactElement {
    const showColorName = (colorScaleStyle: ColorScaleStyle) => {
        switch (colorScaleStyle) {
            case ColorScaleStyle.ColorOnly:
                return false;

            case ColorScaleStyle.ColorAndLabel:
            default:
                return true;
        }
    };

    return (
        <div className={css.colorElement} style={{ backgroundColor: `#${props.color.color.hex}` }}>
            <div className={css.colorName}>
                {showColorName(props.blockSettings.style) ? props.color.color.name : ''}
            </div>
            {props.editingEnabled ? <RemoveButton onRemove={props.onRemove} /> : ''}
        </div>
    );
}
