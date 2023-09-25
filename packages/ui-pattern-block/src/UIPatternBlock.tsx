/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { useBlockSettings } from '@frontify/app-bridge';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { Sandpack, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';

import { type Settings, sandpackThemeValues } from './types';

export const UIPatternBlock = ({ appBridge }: BlockProps): ReactElement => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { sandpackTemplate, sandpackTheme } = blockSettings;

    return (
        <Sandpack
            template={sandpackTemplate as SandpackPredefinedTemplate}
            theme={sandpackThemeValues[sandpackTheme]}
        />
    );
};
