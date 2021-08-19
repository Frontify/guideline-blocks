import { BlockSettings } from './BlockSettings';
import { ColorElement } from './ColorElement';
import { ColorScaleSize } from './ColorScaleSize';
import { ColorViewModel } from './ColorViewModel';
import { FC, useRef, createRef, RefObject } from 'react';
import css from './styles.module.css';

type Props = {
    colors: ColorViewModel[];
    editingEnabled: boolean;
    blockSettings: BlockSettings;
    removeColorAt: (index: number) => void;
    resizeColorAt: (index: number, width: number) => void;
};

export const ColorList: FC<Props> = (props) => {
    const refs = useRef<RefObject<HTMLDivElement>[]>([]);
    refs.current = props.colors.map(() => createRef<HTMLDivElement>());

    const colorSizeClasses: Record<ColorScaleSize, string> = {
        S: css.colorSmall,
        M: css.colorMedium,
        L: css.colorLarge,
    };

    const colorClasses = [css.color, colorSizeClasses[props.blockSettings.size || ColorScaleSize.Medium]];
    props.editingEnabled && colorClasses.push(css.colorResizable);

    const onResize = (index: number, ref: RefObject<HTMLDivElement>): void => {
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
                        key={`color-${index}-${color.color.id}`}
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
};
