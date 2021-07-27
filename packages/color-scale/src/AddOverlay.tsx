import { ReactElement, useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import css from 'styles.module.css';
import AddMoreColors from './AddMoreColors';
import ArrowElement from './ArrowElement';
import { Color } from './Color';

export default function AddOverlay(props: { onAddColor: (color: Color) => void }): ReactElement {
    const [addMoreOverlayVisible, setAddMoreOverlayVisible] = useState<boolean>(false);
    const referenceElement = useRef<HTMLDivElement>(null);
    const popperElement = useRef<HTMLDivElement>(null);
    const arrowElement = useRef<HTMLDivElement>(null);

    const { styles, attributes } = usePopper(referenceElement.current, popperElement.current, {
        placement: 'right',
        modifiers: [
            { name: 'arrow', options: { element: arrowElement.current } },
            { name: 'flip', options: { fallbackPlacements: ['left'] } },
        ],
    });

    const toggleAddMoreOverlay = () => setAddMoreOverlayVisible(!addMoreOverlayVisible);
    const hideAddMoreOverlay = () => setAddMoreOverlayVisible(false);
    const onAddColor = (color: Color) => {
        hideAddMoreOverlay();
        props.onAddColor(color);
    };

    const popperElementStyles = [css.addMoreColorsOverlay];

    if (addMoreOverlayVisible) {
        popperElementStyles.push(css.addMoreColorsOverlayVisible);
    }

    return (
        <div className={css.colorAddOverlay}>
            <div className={css.colorAddOverlayIconTop} onClick={toggleAddMoreOverlay}>
                +
            </div>
            <div className={css.colorAddOverlayIconTopAngle}></div>
            <div ref={referenceElement} className={css.colorAddOverlayStroke}>
                <div className={css.colorAddOverlayBar}></div>
            </div>
            <div className={popperElementStyles.join(' ')} style={styles.popper} ref={popperElement} {...attributes}>
                <ArrowElement arrowElementReference={arrowElement} style={styles.arrow}></ArrowElement>
                <AddMoreColors onConfirm={onAddColor}></AddMoreColors>
            </div>
        </div>
    );
}
