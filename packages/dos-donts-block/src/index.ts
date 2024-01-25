/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { DosDontsBlock } from './DosDontsBlock';
import { settings } from './settings';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';

export default defineBlock({
    block: DosDontsBlock,
    settings,
});
