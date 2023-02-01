/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import 'tailwindcss/tailwind.css';

export const ImageBlock = ({}: BlockProps) => {
    return <div data-test-id="image-block"></div>;
};
