/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue/components';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type ReactNode } from 'react';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import '@frontify/fondue/components/styles';
import 'tailwindcss/tailwind.css';

export const StyleProvider = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme="light">{children}</ThemeProvider>;
};
