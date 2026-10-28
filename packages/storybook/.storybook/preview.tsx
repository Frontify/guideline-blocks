/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Preview } from '@storybook/react-vite';

import './guideline-theme.css';

const WIDTHS: Record<string, string> = {
    full: '100%',
    wide: '1024px',
    medium: '720px',
    narrow: '360px',
};

const preview: Preview = {
    globalTypes: {
        mode: {
            description: 'Render the block as in the published guideline or in the guideline editor',
            toolbar: {
                title: 'Mode',
                icon: 'edit',
                items: [
                    { value: 'view', title: 'View mode', icon: 'eye' },
                    { value: 'edit', title: 'Edit mode', icon: 'edit' },
                ],
                dynamicTitle: true,
            },
        },
        width: {
            description: 'Width of the guideline column the block sits in',
            toolbar: {
                title: 'Width',
                icon: 'grow',
                items: [
                    { value: 'full', title: 'Full width' },
                    { value: 'wide', title: 'Wide (1024px)' },
                    { value: 'medium', title: 'Medium (720px)' },
                    { value: 'narrow', title: 'Narrow (360px)' },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: { mode: 'view', width: 'wide' },
    decorators: [
        (Story, { globals }) => (
            <div style={{ maxWidth: WIDTHS[globals.width as string] ?? '100%', margin: '0 auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        controls: { expanded: true, sort: 'requiredFirst' },
    },
};

export default preview;
