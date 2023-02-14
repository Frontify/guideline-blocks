import 'tailwindcss/tailwind.css';

import { defineBlock } from '@frontify/guideline-blocks-settings';

import { GradientBlock } from './GradientBlock';
import { settings } from './settings';

export default defineBlock({
    block: GradientBlock,
    settings,
});
