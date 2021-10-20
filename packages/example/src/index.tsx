import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';

export default function AnExampleBlock(): ReactElement {
    return (
        <div>
            <span className="text-violet-60 underline">A custom block in blue and underlined</span>
        </div>
    );
}
