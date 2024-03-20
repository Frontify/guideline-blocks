/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UIPatternBlock } from './UIPatternBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';

export default defineBlock({
    block: UIPatternBlock,
    settings,
});
