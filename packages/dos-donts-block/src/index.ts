/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { DosDontsBlockWrapper } from './DosDontsBlock';
import { settings } from './settings';

import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';

export default defineBlock({
    block: DosDontsBlockWrapper,
    settings,
});
