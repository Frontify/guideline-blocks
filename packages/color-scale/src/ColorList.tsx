import { ReactElement, useRef, createRef, RefObject } from 'react';
import { BlockSettings } from './BlockSettings';
import { Color } from './Color';
import ColorElement from './ColorElement';
import { ColorScaleSize } from './ColorScaleSize';
import css from './styles.module.css';

interface Props {
    colors: Color[];
    editingEnabled: boolean;
    blockSettings: BlockSettings;
    removeColorAt: (index: number) => void;
    resizeColorAt: (index: number, width: number) => void;
}

export default function ColorList(props: Props): ReactElement {
    const refs = useRef<RefObject<HTMLDivElement>[]>([]);
    refs.current = props.colors.map(() => createRef<HTMLDivElement>());

    const getColorSizeClass = () => {
        switch (props.blockSettings.size) {
            case ColorScaleSize.Small:
                return css.colorSmall;

            case ColorScaleSize.Large:
                return css.colorLarge;

            case ColorScaleSize.Medium:
            default:
                return css.colorMedium;
        }
    };

    const colorClasses = [css.color, getColorSizeClass()];

    if (props.editingEnabled) {
        colorClasses.push(css.colorResizable);
    }

    const onResize = (index: number, ref: RefObject<HTMLDivElement>) => {
        if (!props.editingEnabled) {
            return;
        }

        const width = ref.current?.clientWidth;
        if (width) {
            props.resizeColorAt(index, width);
        }
    };

    return (
        <div className={css.colors}>
            {props.colors.map((color, index) => {
                return (
                    <div
                        className={colorClasses.join(' ')}
                        style={{ width: color.width }}
                        key={`color-${index}-${color.id}`}
                        onMouseUp={() => onResize(index, refs.current[index])}
                        ref={refs.current[index]}
                    >
                        <ColorElement
                            blockSettings={props.blockSettings}
                            color={color}
                            editingEnabled={props.editingEnabled}
                            index={index}
                            onRemove={() => props.removeColorAt(index)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
