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
import { BlockButtonStyles, type RichTextButtonStyle } from '@frontify/guideline-blocks-shared';
import { useState } from 'react';
import type { Settings } from '../types';
import { CustomButton } from './CustomButton';

export const ButtonModal = ({ closeModal, appBridge }: { closeModal: () => void; appBridge: AppBridgeBlock }) => {
    const [blockSettings, updateBlockSettings] = useBlockSettings<Settings>(appBridge);

    const { buttonStyle, buttonText } = blockSettings;

    const [buttonTextValue, setButtonTextValue] = useState<string>(buttonText || 'Use this template');
    const [buttonStyleValue, setButtonStyleValue] = useState<RichTextButtonStyle>(buttonStyle || 'primary');

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
                        styles={BlockButtonStyles['buttonPrimary']}
                        isActive={buttonStyleValue === 'primary'}
                        onClick={() => setButtonStyleValue('primary')}
                    >
                        Primary Button
                    </CustomButton>

                    <CustomButton
                        id="secondary"
                        styles={BlockButtonStyles['buttonSecondary']}
                        isActive={buttonStyleValue === 'secondary'}
                        onClick={() => setButtonStyleValue('secondary')}
                    >
                        Secondary Button
                    </CustomButton>

                    <CustomButton
                        id="tertiary"
                        styles={BlockButtonStyles['buttonTertiary']}
                        isActive={buttonStyleValue === 'tertiary'}
                        onClick={() => setButtonStyleValue('tertiary')}
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
