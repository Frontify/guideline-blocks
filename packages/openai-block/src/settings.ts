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
    [SettingsKeys.animationSpeed]: number;
    [SettingsKeys.showHistory]: boolean;
};

const CHAT_PERSONALITIES = [
    'Chat assistant',
    '18th Century Poet',
    'Jolly Wizard',
    'Disgruntled Pirate',
    'Sassy teenager',
    'Nicholas Cage',
];

export const settings = defineSettings({
    basics: [
        {
            id: SettingsKeys.isPersonalityCustom,
            label: 'Chat Personality',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: SettingsKeys.personalityCustom,
                    type: 'input',
                    placeholder: 'Chat assistant',
                    defaultValue: 'Chat assistant',
                },
            ],
            off: [
                {
                    id: SettingsKeys.personalityChoice,
                    type: 'dropdown',
                    choices: CHAT_PERSONALITIES.map((personality) => ({ value: personality, label: personality })),
                    defaultValue: CHAT_PERSONALITIES[0],
                },
            ],
        },
    ],
    layout: [
        { id: SettingsKeys.showHistory, type: 'switch', defaultValue: true, label: 'Show History' },
        {
            id: SettingsKeys.isAnimationEnabled,
            type: 'switch',
            defaultValue: true,
            label: 'Animations',
            on: [
                {
                    id: SettingsKeys.animationSpeed,
                    type: 'input',
                    inputType: 'number',
                    info: 'Animation speed in milliseconds',
                    label: 'Animation Speed',
                    placeholder: '300',
                    defaultValue: '300',
                    rules: [minimumNumericRule(0)],
                },
            ],
        },
    ],
});
