import { Color } from '@frontify/app-bridge';
import { FC } from 'react';
import css from './styles.module.css';

type Props = {
    colors: Color[];
    onConfirm: (color: Color) => void;
    isLoading: boolean;
};

export const AddMoreColors: FC<Props> = (props: Props) => {
    return (
        <div className={css.addMoreColors}>
            {props.isLoading ? (
                <span>Loading...</span>
            ) : (
                props.colors.map((color, index) => (
                    <div
                        className={css.addMoreColorsColor}
                        key={`color-${color}-${index}`}
                        onClick={() => props.onConfirm(color)}
                        style={{ backgroundColor: `#${color.hex}` }}
                    ></div>
                ))
            )}
        </div>
    );
};
