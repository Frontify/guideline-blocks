import { ReactElement } from 'react';
import css from './styles.module.css';

interface Props {
    onRemove: () => void;
}

export default function RemoveButton(props: Props): ReactElement {
    return (
        <div className={css.removeButton} onClick={() => props.onRemove()}>
            <i className="ca-icon ca-icon--trash"></i>
        </div>
    );
}
