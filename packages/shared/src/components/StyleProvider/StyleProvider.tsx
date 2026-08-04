/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue/components';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type ReactNode } from 'react';

import './styles.css';

export const StyleProvider = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <ThemeProvider className={className} theme="light">
            {children}
        </ThemeProvider>
    );
};
