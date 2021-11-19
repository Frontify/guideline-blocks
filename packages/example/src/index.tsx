/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { ReactElement } from 'react';

export default function AnExampleBlock(): ReactElement {
    return (
        <div>
            <span className="tw-text-violet-60 tw-underline">A custom block in violet and underlined</span>
        </div>
    );
}
