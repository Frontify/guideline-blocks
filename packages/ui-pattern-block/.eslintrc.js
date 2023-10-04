/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    extends: ['@frontify/eslint-config-react', 'plugin:jsx-a11y/recommended'],
    plugins: ['notice'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.js', '*.ts', '*.tsx'],
            rules: {
                'notice/notice': [
                    'error',
                    {
                        template: '/* (c) Copyright Frontify Ltd., all rights reserved. */\n\n',
                        messages: {
                            whenFailedToMatch: 'No Frontify copyright header set.',
                        },
                    },
                ],
                'react-hooks/exhaustive-deps': 'off',
            },
        },
    ],
};
