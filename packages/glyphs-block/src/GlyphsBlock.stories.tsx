/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';
import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import definition from './index';

export default { title: 'Blocks/Glyphs', ...blockMeta(definition) };

// The sidebar lists the project's fonts from the Frontify API, so the stories use system font stacks instead.
const SERIF = 'Georgia, "Times New Roman", serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const INDIGO = { red: 79, green: 70, blue: 229, alpha: 1 };
const INDIGO_TINT = { red: 238, green: 242, blue: 255, alpha: 1 };

export const Default: BlockStory = {};

export const SerifLarge: BlockStory = {
    args: {
        fontFamily: SERIF,
        fontSize: '64px',
        fontWeight: 'normal',
        chars: 'A, a, B, b, C, c, G, g, R, r, &, @, ?, !, 1, 2, 3, 7',
    },
};

export const MonospaceWithBackground: BlockStory = {
    args: {
        fontFamily: MONO,
        fontSize: '32px',
        fontWeight: 'bold',
        chars: '{, }, [, ], (, ), <, >, =, +, -, *, /, %, #, $, _, ;, :, .',
        hasBackground: true,
        backgroundColor: INDIGO_TINT,
        fontColor: INDIGO,
    },
};

export const NoBorderRounded: BlockStory = {
    args: { hasBorder: false, hasBackground: true, backgroundColor: INDIGO_TINT, radiusChoice: Radius.Large },
};

export const DashedBorderCustomRadius: BlockStory = {
    args: {
        borderStyle: BorderStyle.Dashed,
        borderWidth: '2px',
        borderColor: INDIGO,
        hasRadius: true,
        radiusValue: '16px',
    },
};
