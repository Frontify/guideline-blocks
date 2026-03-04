/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue/components';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type ReactNode } from 'react';

import './styles.css';

export const StyleProvider = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme="light">{children}</ThemeProvider>;
};
