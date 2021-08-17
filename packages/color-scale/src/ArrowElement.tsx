import { CSSProperties, FC, Ref } from 'react';
import css from './styles.module.css';

type Props = {
    arrowElementReference: Ref<HTMLDivElement>;
    style: CSSProperties;
};

export const ArrowElement: FC<Props> = (props: Props) => {
    return (
        <div ref={props.arrowElementReference} className={css.addMoreColorsArrowContainer} style={props.style}>
            <div className={css.addMoreColorsArrow}>
                <i className="ca-icon ca-icon--caret-left"></i>
            </div>
        </div>
    );
};
