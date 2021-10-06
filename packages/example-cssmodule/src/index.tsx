import { CSSProperties, ReactElement } from 'react';
import style from './style.module.css';

export default function AnExampleBlock(): ReactElement {
    const customStyle: CSSProperties = {
        color: 'red',
    };

    return (
        <div>
            <span className={style.underline} style={customStyle}>
                A custom block in blue and underlined
            </span>
        </div>
    );
}
