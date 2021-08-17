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
    return (
        <div className={css.colorElement} style={{ backgroundColor: `#${props.color.color.hex}` }}>
            <div className={css.colorName}>
                {props.blockSettings.style !== ColorScaleStyle.ColorOnly && props.color.color.name}
            </div>
            {props.editingEnabled && <RemoveButton onRemove={props.onRemove} />}
        </div>
    );
};
