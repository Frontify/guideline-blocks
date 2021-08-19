import { FC } from 'react';
import css from './styles.module.css';

type Props = {
    onRemove: () => void;
};

export const RemoveButton: FC<Props> = (props) => {
    return (
        <div className={css.removeButton} onClick={() => props.onRemove()}>
            <i className="ca-icon ca-icon--trash"></i>
        </div>
    );
};
