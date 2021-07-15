import { ReactElement } from 'react';
import css from 'styles.module.css';

export default function AddOverlay(props: { onClick: () => void }): ReactElement {
    return (
        <div className={css.colorAddOverlay} onClick={() => props.onClick()}>
            <div className={css.colorAddOverlayIconTop}>+</div>
            <div className={css.colorAddOverlayIconTopAngle}></div>
            <div className={css.colorAddOverlayStroke}>
                <div className={css.colorAddOverlayBar}></div>
            </div>
            <div className={css.colorAddOverlayIconBottomAngle}></div>
            <div className={css.colorAddOverlayIconBottom}>+</div>
        </div>
    );
}
