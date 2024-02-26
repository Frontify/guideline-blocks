/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { CompareSliderBlock } from './CompareSliderBlock';
import { settings } from './settings';

export default defineBlock({
    block: CompareSliderBlock,
    settings,
});
