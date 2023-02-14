import 'tailwindcss/tailwind.css';

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { CompareSliderBlock } from './CompareSliderBlock';
import { settings } from './settings';

export default defineBlock({
    block: CompareSliderBlock,
    settings,
});
