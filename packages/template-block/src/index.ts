/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';
import { TemplateBlock } from './TemplateBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

export default defineBlock({
    block: TemplateBlock,
    settings,
});
