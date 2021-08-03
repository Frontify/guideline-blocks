import { ReactElement } from 'react';
import css from 'styles.module.css';
import { Color } from './Color';
import { BlockSettings } from './BlockSettings';
import { ColorScaleStyle } from './ColorScaleStyle';
import RemoveButton from './RemoveButton';

interface Props {
    blockSettings: BlockSettings;
    color: Color;
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
        <div className={css.colorElement}>
            <div className={css.colorBackground} style={{ backgroundColor: `#CCC` }}></div>
            <div className={css.colorName}>
                {showColorName(props.blockSettings.style) ? `Color ${props.color.id}` : ''}
            </div>
            {props.editingEnabled ? <RemoveButton onRemove={props.onRemove} /> : ''}
        </div>
    );
}
