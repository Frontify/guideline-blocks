/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/guideline-blocks-settings/styles';
import 'tailwindcss/tailwind.css';
import '@frontify/fondue/style';
import { TemplateBlock } from './TemplateBlock';
import { settings } from './settings';
import { defineBlock } from '@frontify/guideline-blocks-settings';

export default defineBlock({
    block: TemplateBlock,
    settings,
});
