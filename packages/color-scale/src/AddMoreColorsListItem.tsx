import { FC } from 'react';
import { Color } from '@frontify/app-bridge';
import css from './styles.module.css';

type Props = {
    color: Color;
    onClick: () => void;
};

export const AddMoreColorsListItem: FC<Props> = (props) => {
    return (
        <div
            className={css.addMoreColorsColor}
            onClick={() => props.onClick()}
            style={{ backgroundColor: `#${props.color.hex}` }}
        ></div>
    );
};
