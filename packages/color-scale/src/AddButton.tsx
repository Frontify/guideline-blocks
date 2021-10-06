import { AddMoreColors } from './AddMoreColors';
import { Button, ButtonSize, ButtonStyle } from '@frontify/arcade';
import { ColorViewModel } from './ColorViewModel';
import { Color, AppBridgeNative } from '@frontify/app-bridge';
import { defaultColorWidth } from './Constants';
import { useState, FC } from 'react';
import { usePopper } from 'react-popper';
import { useClickOutsideNotify } from './useClickOutsideNotify';
import css from './styles.module.css';

type Props = {
    projectId: number;
    onConfirm: (color: ColorViewModel) => void;
    appBridge: AppBridgeNative;
};

export const AddButton: FC<Props> = (props) => {
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

    const showFlyout = async (): Promise<void> => {
        setFlyoutVisible(true);
        setIsLoading(true);

        try {
            const result = await props.appBridge.getAvailableColors();
            setColors(result);
        } finally {
            setIsLoading(false);
            if (update) {
                update();
            }
        }
    };

    const hideFlyout = () => setFlyoutVisible(false);
    const toggleFlyout = () => (flyoutVisible ? hideFlyout() : showFlyout());

    const confirmSelection = (color: Color): void => {
        hideFlyout();
        props.onConfirm({ color, width: defaultColorWidth });
    };

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
                {...attributes.popper}
                ref={setPopperElement}
                className={css.addMoreColorsFlyout}
                style={styles.popper}
            >
                {flyoutVisible && (
                    <div className={css.addMoreColorsContainer}>
                        <AddMoreColors
                            colors={colors}
                            onConfirm={(color) => confirmSelection(color)}
                            isLoading={isLoading}
                        />
                        <div ref={setArrowElement} className={css.addMoreColorsArrowContainer}>
                            <div className={css.addMoreColorsArrow}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
