import { BlockSettings } from './BlockSettings';
import { ColorScaleStyle } from './ColorScaleStyle';
import { ColorViewModel } from './ColorViewModel';
import { FC } from 'react';
import { RemoveButton } from './RemoveButton';
import css from 'styles.module.css';

type Props = {
    blockSettings: BlockSettings;
    color: ColorViewModel;
    index: number;
    editingEnabled: boolean;
    onRemove: () => void;
};

export const ColorElement: FC<Props> = (props: Props) => {
    const showColorName = (colorScaleStyle: ColorScaleStyle): boolean => {
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
            <div className={css.colorName}>{showColorName(props.blockSettings.style) && props.color.color.name}</div>
            {props.editingEnabled && <RemoveButton onRemove={props.onRemove} />}
        </div>
    );
};
