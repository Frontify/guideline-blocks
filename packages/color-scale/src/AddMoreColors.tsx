import { ReactElement } from 'react';
import { Color } from './Color';
import css from './styles.module.css';

interface Props {
    onConfirm: (color: Color) => void;
}

export default function AddMoreColors(props: Props): ReactElement {
    const colors: Color[] = [
        { name: 'red', hex: '#FF0000', id: 17 },
        { name: 'blue', hex: '#0000FF', id: 18 },
        { name: 'green', hex: '#00FF00', id: 19 },
    ];

    return (
        <div className={css.addMoreColors}>
            {colors.map((color) => {
                return (
                    <div
                        className={css.addMoreColorsColor}
                        onClick={() => props.onConfirm(color)}
                        key={color.id}
                        style={{ backgroundColor: color.hex }}
                    ></div>
                );
            })}
        </div>
    );
}
