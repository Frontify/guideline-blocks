/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';

import { ColorKitBlock } from './ColorKitBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

export default defineBlock({
    block: ColorKitBlock,
    settings,
});
