/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThemeProvider } from '@frontify/fondue/components';
// eslint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { type ComponentPropsWithoutRef, forwardRef, type ReactNode } from 'react';

import './styles.css';

type StyleProviderProps = ComponentPropsWithoutRef<'div'> & {
    appId: string;
    children: ReactNode;
};

export const StyleProvider = forwardRef<HTMLDivElement, StyleProviderProps>(
    ({ appId, className, children, ...rest }, ref) => (
        <div ref={ref} className={[appId, className].filter(Boolean).join(' ')} {...rest}>
            {/* Passing `appId` as ThemeProvider's className propagates the scope class to portaled
                content (Dropdown, Tooltip, Dialog), so the block's scoped styles reach overlays too. */}
            <ThemeProvider theme="light" className={appId}>
                {children}
            </ThemeProvider>
        </div>
    )
);

StyleProvider.displayName = 'StyleProvider';
