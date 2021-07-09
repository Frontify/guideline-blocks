import { CSSProperties, ReactElement } from 'react';

export default function AnExampleBlock(): ReactElement {
    const customStyle: CSSProperties = {
        color: 'blue',
    };

    return (
        <div>
            <span style={customStyle}>A custom block in blue</span>
        </div>
    );
}
