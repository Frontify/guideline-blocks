import { ReactElement, useState } from 'react';
import { usePopper } from 'react-popper';
import AddMoreColors from './AddMoreColors';
import css from './styles.module.css';
import useClickOutsideNotify from './useClickOutsideNotify';
import { Button, ButtonSize, ButtonStyle } from '@frontify/arcade';
import { HttpClient } from '@frontify/frontify-cli/types';
import { ApiReponse, ColorApiResponse } from './ApiResponse';

interface Props {
    httpClient: HttpClient;
    projectId: number;
    onConfirm: (color: ColorApiResponse) => void;
}

export default function AddButton(props: Props): ReactElement {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const [flyoutVisible, setFlyoutVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [colors, setColors] = useState<ColorApiResponse[]>([]);

    const showFlyout = () => {
        setFlyoutVisible(true);
        setIsLoading(true);

        props.httpClient
            .get<ApiReponse>(`/api/color/library/${props.projectId}`)
            .then((response) => {
                const c: ColorApiResponse[] = [];
                response.palettes.forEach((colorPalette) => colorPalette.colors.forEach((color) => c.push(color)));
                setColors(c);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    const hideFlyout = () => setFlyoutVisible(false);
    const toggleFlyout = () => (flyoutVisible ? hideFlyout() : showFlyout());

    const confirmSelection = (color: ColorApiResponse): void => {
        hideFlyout();
        props.onConfirm(color);
    };

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'right',
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

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
