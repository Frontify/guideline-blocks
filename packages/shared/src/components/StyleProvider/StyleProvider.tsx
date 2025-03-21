/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';

import { ThemeProvider } from '@frontify/fondue/components';
import '@frontify/guideline-blocks-settings/styles';
import '@frontify/fondue/style';
import 'tailwindcss/tailwind.css';

export const StyleProvider = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme="light">{children}</ThemeProvider>;
};
