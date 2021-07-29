import { ReactElement, useState } from 'react';
import { usePopper } from 'react-popper';
import AddMoreColors from './AddMoreColors';
import { Color } from './Color';
import css from './styles.module.css';

interface Props {
    onConfirm: (color: Color) => void;
}

export default function AddButton(props: Props): ReactElement {
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

    const [flyoutVisible, setFlyoutVisible] = useState<boolean>(false);
    const toggleFlyout = () => setFlyoutVisible(!flyoutVisible);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'right',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    const popperElementClassNames = [css.addMoreColorsFlyout];

    const flyout: ReactElement = (
        <div className={css.addMoreColorsContainer}>
            <AddMoreColors onConfirm={props.onConfirm}></AddMoreColors>
            <div ref={setArrowElement} className={css.addMoreColorsArrowContainer}>
                <div className={css.addMoreColorsArrow}></div>
            </div>
        </div>
    );

    return (
        <div className={css.addButtonContainer}>
            <button ref={setReferenceElement} onClick={() => toggleFlyout()}>
                <i className="ca-icon ca-icon--add-simple"></i> Add Color
            </button>
            <div
                ref={setPopperElement}
                className={popperElementClassNames.join(' ')}
                style={styles.popper}
                {...attributes.popper}
            >
                {flyoutVisible ? flyout : ''}
            </div>
        </div>
    );
}
