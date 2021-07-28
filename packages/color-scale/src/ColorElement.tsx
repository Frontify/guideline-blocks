import { ReactElement } from 'react';
import AddOverlay from './AddOverlay';
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
    onAddColor: (color: Color) => void;
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

    const ColorLabel = (): ReactElement => (
        <div className={css.colorName}>{showColorName(props.blockSettings.style) ? props.color.name : ''}</div>
    );

    return (
        <div className={css.colorElement}>
            <div className={css.colorBackground} style={{ backgroundColor: `#${props.color.hex}` }}></div>
            <ColorLabel></ColorLabel>
            {props.editingEnabled ? <RemoveButton onRemove={props.onRemove}></RemoveButton> : ''}
            {props.editingEnabled ? <AddOverlay onAddColor={props.onAddColor}></AddOverlay> : ''}
        </div>
    );
}
