import { ReactElement } from 'react';
import 'tailwindcss/tailwind.css';

export default function AnExampleBlock(): ReactElement {
    return (
        <div>
            <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined</span>
        </div>
    );
}
