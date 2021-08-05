import { ReactElement, useState } from 'react';
import { usePopper } from 'react-popper';
import AddMoreColors from './AddMoreColors';
import css from './styles.module.css';
import useClickOutsideNotify from './useClickOutsideNotify';
import { Button, ButtonSize, ButtonStyle } from '@frontify/arcade';
import { HttpClient } from '@frontify/frontify-cli/types';
import { ColorViewModel } from './ColorViewModel';
import { defaultColorWidth } from './Constants';
import { createNativeAppBridge, Color } from '@frontify/app-bridge';

interface Props {
    httpClient: HttpClient;
    projectId: number;
    onConfirm: (color: ColorViewModel) => void;
}

export default function AddButton(props: Props): ReactElement {
    const appBridge = createNativeAppBridge();
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const [flyoutVisible, setFlyoutVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [colors, setColors] = useState<Color[]>([]);
    const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
        placement: 'right',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

    const showFlyout = () => {
        setFlyoutVisible(true);
        setIsLoading(true);

        appBridge.colors
            .getAvailableColors()
            .then((result) => setColors(result))
            .finally(() => {
                setIsLoading(false);
                if (update) {
                    update();
                }
            });
    };

    const hideFlyout = () => setFlyoutVisible(false);
    const toggleFlyout = () => (flyoutVisible ? hideFlyout() : showFlyout());

    const confirmSelection = (color: Color): void => {
        hideFlyout();
        props.onConfirm({ color, width: defaultColorWidth });
    };

    const popperElementClassNames = [css.addMoreColorsFlyout];

    const flyout: ReactElement = (
        <div className={css.addMoreColorsContainer}>
            <AddMoreColors colors={colors} onConfirm={(color) => confirmSelection(color)} isLoading={isLoading} />
            <div ref={setArrowElement} className={css.addMoreColorsArrowContainer}>
                <div className={css.addMoreColorsArrow}></div>
            </div>
        </div>
    );

    useClickOutsideNotify(popperElement, () => hideFlyout());

    return (
        <div className={css.addButtonContainer}>
            <div ref={setReferenceElement} style={{ display: 'inline-flex', position: 'relative' }}>
                <Button
                    disabled={false}
                    size={ButtonSize.Medium}
                    style={ButtonStyle.Secondary}
                    solid={true}
                    onClick={() => toggleFlyout()}
                >
                    + Add Color
                </Button>
            </div>
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
