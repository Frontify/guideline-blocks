import { CSSProperties, ReactElement, Ref } from 'react';
import css from './styles.module.css';

interface Props {
    arrowElementReference: Ref<HTMLDivElement>;
    style: CSSProperties;
}

export default function ArrowElement(props: Props): ReactElement {
    return (
        <div ref={props.arrowElementReference} className={css.addMoreColorsArrowContainer} style={props.style}>
            <div className={css.addMoreColorsArrow}>
                <i className="ca-icon ca-icon--caret-left"></i>
            </div>
        </div>
    );
}
