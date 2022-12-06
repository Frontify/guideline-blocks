/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockSettings } from '@frontify/app-bridge';
import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    ButtonStyle,
    FormControl,
    IconCheckMark,
    TextInput,
} from '@frontify/fondue';
import { DesignTokenName, TokenValues } from '@frontify/guideline-blocks-shared';
import { useState } from 'react';
import { Settings } from '../types';
import { CustomButton } from './CustomButton';

export const ButtonModal = ({
    closeModal,
    designTokens,
    appBridge,
}: {
    closeModal: () => void;
    designTokens: Partial<Record<DesignTokenName, TokenValues>> | null;
    appBridge: AppBridgeBlock;
}) => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);

    const { buttonStyle, buttonText } = blockSettings;

    const [buttonTextValue, setButtonTextValue] = useState<string>(buttonText || 'Use this template');
    const [buttonStyleValue, setButtonStyleValue] = useState<DesignTokenName>(buttonStyle || 'button_primary');

    const onSave = () => {
        updateBlockSettings({
            ...blockSettings,
            buttonStyle: buttonStyleValue,
            buttonText: buttonTextValue,
        });
        closeModal();
    };

    return (
        <div className="tw-p-7">
            <FormControl
                label={{
                    children: 'Text',
                    htmlFor: 'linkText',
                }}
            >
                <TextInput
                    id="linkText"
                    value={buttonTextValue}
                    placeholder="Button Text"
                    onChange={setButtonTextValue}
                />
            </FormControl>
            <div className="tw-pt-5">
                <FormControl
                    label={{
                        children: 'Button Style',
                        htmlFor: 'buttonStyle',
                    }}
                >
                    <CustomButton
                        id="primary"
                        styles={designTokens?.button_primary}
                        isActive={buttonStyleValue === 'button_primary'}
                        onClick={() => setButtonStyleValue('button_primary')}
                    >
                        Primary Button
                    </CustomButton>

                    <CustomButton
                        id="secondary"
                        styles={designTokens?.button_secondary}
                        isActive={buttonStyleValue === 'button_secondary'}
                        onClick={() => setButtonStyleValue('button_secondary')}
                    >
                        Secondary Button
                    </CustomButton>

                    <CustomButton
                        id="tertiary"
                        styles={designTokens?.button_tertiary}
                        isActive={buttonStyleValue === 'button_tertiary'}
                        onClick={() => setButtonStyleValue('button_tertiary')}
                    >
                        Tertiary Button
                    </CustomButton>
                </FormControl>
            </div>
            <div className="tw-mt-3">
                <div className={'tw-pt-5 tw-flex tw-gap-x-3 tw-justify-end tw-border-t tw-border-t-black-10'}>
                    <Button
                        onClick={closeModal}
                        size={ButtonSize.Medium}
                        style={ButtonStyle.Default}
                        emphasis={ButtonEmphasis.Default}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSave} size={ButtonSize.Medium} icon={<IconCheckMark />}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
