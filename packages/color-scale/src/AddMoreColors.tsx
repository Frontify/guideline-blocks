import { Color } from '@frontify/app-bridge';
import { FC } from 'react';
import { AddMoreColorsListItem } from './AddMoreColorsListItem';
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
                    <AddMoreColorsListItem
                        color={color}
                        onClick={() => props.onConfirm(color)}
                        key={`color-${color}-${index}`}
                    />
                ))
            )}
        </div>
    );
};
