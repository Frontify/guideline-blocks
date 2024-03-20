/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineBlock } from '@frontify/guideline-blocks-settings';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';
import { GlyphsBlock } from './GlyphsBlock';
import { settings } from './settings';

export default defineBlock({
    block: GlyphsBlock,
    settings,
});
