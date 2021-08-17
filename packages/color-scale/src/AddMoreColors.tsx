import { Color } from '@frontify/app-bridge';
import { FC, ReactElement } from 'react';
import css from './styles.module.css';

type Props = {
    colors: Color[];
    onConfirm: (color: Color) => void;
    isLoading: boolean;
};

export const AddMoreColors: FC<Props> = (props: Props) => {
    const listItem = (color: Color, index: number): ReactElement => (
        <div
            className={css.addMoreColorsColor}
            onClick={() => props.onConfirm(color)}
            style={{ backgroundColor: `#${color.hex}` }}
            key={`color-${color}-${index}`}
        ></div>
    );

    return (
        <div className={css.addMoreColors}>
            {props.isLoading ? <span>Loading...</span> : props.colors.map((color, index) => listItem(color, index))}
        </div>
    );
};
