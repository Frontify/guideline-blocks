/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings, minimumNumericRule } from '@frontify/guideline-blocks-settings';

enum SettingsKeys {
    isPersonalityCustom = 'isPersonalityCustom',
    personalityChoice = 'personalityChoice',
    personalityCustom = 'personalityCustom',
    isAnimationEnabled = 'isAnimationEnabled',
    animationSpeed = 'animationSpeed',
    showHistory = 'showHistory',
}

export type Settings = {
    [SettingsKeys.isPersonalityCustom]: boolean;
    [SettingsKeys.personalityChoice]: string;
    [SettingsKeys.personalityCustom]: string;
    [SettingsKeys.isAnimationEnabled]: boolean;
    [SettingsKeys.animationSpeed]: string;
    [SettingsKeys.showHistory]: boolean;
};

const CHAT_PERSONALITIES = [
    'Chat Assistant',
    '18th Century Poet',
    'Jolly Wizard',
    'Disgruntled Pirate',
    'Sassy Teenager',
    'Nicholas Cage',
];

export const DEFAULT_VALUES: Settings = {
    isPersonalityCustom: false,
    personalityCustom: CHAT_PERSONALITIES[0],
    personalityChoice: CHAT_PERSONALITIES[0],
    isAnimationEnabled: true,
    animationSpeed: '300',
    showHistory: true,
};

export const settings = defineSettings({
    basics: [
        {
            id: SettingsKeys.isPersonalityCustom,
            label: 'Chat Personality',
            info: 'The personality that will be applied to your chat responses.',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: DEFAULT_VALUES.isPersonalityCustom,
            on: [
                {
                    id: SettingsKeys.personalityCustom,
                    type: 'input',
                    placeholder: DEFAULT_VALUES.personalityCustom,
                    defaultValue: DEFAULT_VALUES.personalityCustom,
                },
            ],
            off: [
                {
                    id: SettingsKeys.personalityChoice,
                    type: 'dropdown',
                    choices: CHAT_PERSONALITIES.map((personality) => ({ value: personality, label: personality })),
                    defaultValue: DEFAULT_VALUES.personalityChoice,
                },
            ],
        },
    ],
    layout: [
        {
            id: SettingsKeys.showHistory,
            type: 'switch',
            defaultValue: DEFAULT_VALUES.showHistory,
            label: 'Show History',
            info: 'If enabled the user will be able to navigate through their previous questions.',
        },
        {
            id: SettingsKeys.isAnimationEnabled,
            type: 'switch',
            defaultValue: DEFAULT_VALUES.isAnimationEnabled,
            label: 'Animations (ms)',
            info: 'Animation speed of the chat response in milliseconds. If disabled no animation will be present.',
            on: [
                {
                    id: SettingsKeys.animationSpeed,
                    type: 'input',
                    inputType: 'number',
                    placeholder: DEFAULT_VALUES.animationSpeed,
                    defaultValue: DEFAULT_VALUES.animationSpeed,
                    rules: [minimumNumericRule(0)],
                },
            ],
        },
    ],
});
