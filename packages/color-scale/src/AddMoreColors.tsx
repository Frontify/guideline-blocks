import { ReactElement } from 'react';
import { ColorApiResponse } from './ApiResponse';
import css from './styles.module.css';

interface Props {
    colors: ColorApiResponse[];
    onConfirm: (color: ColorApiResponse) => void;
    isLoading: boolean;
}

export default function AddMoreColors(props: Props): ReactElement {
    const listItem = (color: ColorApiResponse) => (
        <div
            className={css.addMoreColorsColor}
            onClick={() => props.onConfirm(color)}
            key={color.id}
            style={{ backgroundColor: `#${color.hex}` }}
        ></div>
    );

    const loading = () => <span>Loading...</span>;

    return (
        <div className={css.addMoreColors}>
            {props.isLoading ? loading() : props.colors.map((color) => listItem(color))}
        </div>
    );
}
