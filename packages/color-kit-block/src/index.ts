/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';

import { ColorKitBlock } from './ColorKitBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

export default defineBlock({
    block: ColorKitBlock,
    settings,
});
