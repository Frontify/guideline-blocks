/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UIPatternBlock } from './UIPatternBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';

export default defineBlock({
    block: UIPatternBlock,
    settings,
});
