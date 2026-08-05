/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue/components';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type ReactNode } from 'react';

import './styles.css';

export const StyleProvider = ({ children, scope }: { children: ReactNode; scope: string }) => {
    return (
        <ThemeProvider className={scope} theme="light">
            {children}
        </ThemeProvider>
    );
};
