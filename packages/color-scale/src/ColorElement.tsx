import { ReactElement } from 'react';
import AddOverlay from './AddOverlay';
import css from 'styles.module.css';
import { Color } from './Color';
import { BlockSettings } from './BlockSettings';

interface Props {
    blockSettings: BlockSettings;
    color: Color;
    index: number;
    editingEnabled: boolean;
    onClick: () => void;
}

export default function ColorElement(props: Props): ReactElement {
    const ColorLabel = (): ReactElement => (
        <div className={css.colorName}>{props.blockSettings.style === 'COLOR_AND_LABEL' ? props.color.name : ''}</div>
    );

    return (
        <div className={css.colorElement}>
            <div className={css.colorBackground} style={{ backgroundColor: `${props.color.hex}` }}></div>
            <ColorLabel></ColorLabel>
            {props.editingEnabled ? <AddOverlay onClick={() => props.onClick()}></AddOverlay> : ''}
        </div>
    );
}
