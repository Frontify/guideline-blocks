/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Flyout } from '@frontify/fondue';
import { BlockButtonStyles } from '@frontify/guideline-blocks-shared';
import { useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Settings } from '../types';
import { ButtonModal } from './ButtonModal';
import { CustomButton } from './CustomButton';

export const Buttons = ({ appBridge }: BlockProps) => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { buttonStyle, buttonText } = blockSettings;

    const [isButtonFlyoutOpen, setIsButtonFlyoutOpen] = useState(false);

    if (isEditing) {
        return (
            <Flyout
                isOpen={isButtonFlyoutOpen}
                onOpenChange={() => setIsButtonFlyoutOpen(isButtonFlyoutOpen)}
                trigger={
                    <CustomButton
                        id="use-template"
                        styles={
                            buttonStyle && BlockButtonStyles
                                ? BlockButtonStyles[buttonStyle]
                                : BlockButtonStyles['buttonPrimary']
                        }
                        onClick={() => setIsButtonFlyoutOpen(!isButtonFlyoutOpen)}
                    >
                        {buttonText ? buttonText : 'Use this template'}
                    </CustomButton>
                }
                hug={false}
                legacyFooter={false}
            >
                <ButtonModal closeModal={() => setIsButtonFlyoutOpen(false)} appBridge={appBridge} />
            </Flyout>
        );
    } else {
        return (
            <CustomButton
                id="use-template"
                styles={
                    buttonStyle && BlockButtonStyles
                        ? BlockButtonStyles[buttonStyle]
                        : BlockButtonStyles['buttonPrimary']
                }
                onClick={() => console.log('use template')}
            >
                {buttonText ? buttonText : 'Use this template'}
            </CustomButton>
        );
    }
};
