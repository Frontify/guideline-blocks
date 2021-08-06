import { ReactElement } from 'react';
import css from './styles.module.css';
import { Color } from '@frontify/app-bridge';

interface Props {
    colors: Color[];
    onConfirm: (color: Color) => void;
    isLoading: boolean;
}

export default function AddMoreColors(props: Props): ReactElement {
    const listItem = (color: Color, index: number) => (
        <div
            className={css.addMoreColorsColor}
            onClick={() => props.onConfirm(color)}
            style={{ backgroundColor: `#${color.hex}` }}
            key={`color-${color}-${index}`}
        ></div>
    );

    const loading = <span>Loading...</span>;

    return (
        <div className={css.addMoreColors}>
            {props.isLoading ? loading : props.colors.map((color, index) => listItem(color, index))}
        </div>
    );
}
