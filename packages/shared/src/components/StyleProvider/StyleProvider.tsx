/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';

import { ThemeProvider } from '@frontify/fondue/components';
import '@frontify/guideline-blocks-settings/styles';
import 'tailwindcss/tailwind.css';
import '@frontify/fondue/style';

export const StyleProvider = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme="light">{children}</ThemeProvider>;
};
