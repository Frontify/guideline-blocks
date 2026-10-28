/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { DividerAlignment, DividerHeight, DividerStyle, DividerWidth } from './types';

import definition from './index';

export default { title: 'Blocks/Divider', ...blockMeta(definition) };

export const Default: BlockStory = {};

export const DashedHalfWidthCentred: BlockStory = {
    args: {
        style: DividerStyle.Dashed,
        widthSimple: DividerWidth['50%'],
        alignment: DividerAlignment.Center,
        thickness: '2px',
        color: { red: 79, green: 70, blue: 229, alpha: 1 },
    },
};

export const DottedShortRight: BlockStory = {
    args: {
        style: DividerStyle.Dotted,
        widthSimple: DividerWidth['25%'],
        alignment: DividerAlignment.Right,
        heightSimple: DividerHeight.Large,
        thickness: '4px',
        color: { red: 219, green: 39, blue: 119, alpha: 1 },
    },
};

export const CustomSize: BlockStory = {
    args: {
        isWidthCustom: true,
        widthCustom: '320px',
        isHeightCustom: true,
        heightCustom: '120px',
        thickness: '6px',
        alignment: DividerAlignment.Left,
    },
};

export const Spacer: BlockStory = {
    args: { isLine: DividerStyle.NoLine, heightSimple: DividerHeight.Medium },
};
