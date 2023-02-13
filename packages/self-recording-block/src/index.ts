/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { SelfRecordingBlock } from './SelfRecordingBlock';
import { settings } from './settings';

export default defineBlock({
    block: SelfRecordingBlock,
    settings,
});
