/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ApiBundle } from '../../hooks/useApiBundle';
import { BlockType, InputBlock } from '../../hooks/useSettings';
import { InputBlock as InputBlockComponent, InputBlockProps } from './InputBlock';
import {
    maximumNumericalPixelValueOrAuto,
    minimumNumericalPixelValueOrAuto,
    numericalPixelValueOrAutoRule,
} from '../../rules/pixelRules';

const inputSetting: InputBlock = {
    id: 'input',
    type: BlockType.Input,
    label: 'Normal Input',
    placeholder: 'Input',
};

const inputSettingWithValidation: InputBlock = {
    id: 'inputWithValidation',
    type: BlockType.Input,
    label: 'Input with validation',
    info: "The value should be a number or 'auto'.",
    placeholder: '24px',
    defaultValue: 'auto',
    rules: [numericalPixelValueOrAutoRule, minimumNumericalPixelValueOrAuto(0), maximumNumericalPixelValueOrAuto(200)],
    onChange: (bundle: ApiBundle): void => {
        const columnGap = Number(bundle.getBlock('inputWithValidation')?.value);
        if (!isNaN(columnGap)) {
            bundle.setBlockValue('inputWithValidation', `${columnGap}px`);
        }
    },
};

export default {
    title: 'Sidebar Settings/Settings Block/Input',
    component: InputBlockComponent,
    argTypes: {
        onUpdate: { action: 'onUpdate' },
    },
} as Meta;

const InputBlockTemplate: Story<InputBlockProps> = (args: InputBlockProps) => <InputBlockComponent {...args} />;

export const normal = InputBlockTemplate.bind({});
normal.args = {
    block: inputSetting,
};

export const withValidation = InputBlockTemplate.bind({});
withValidation.args = {
    block: inputSettingWithValidation,
};
