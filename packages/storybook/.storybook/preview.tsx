/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Preview } from '@storybook/react-vite';

import './guideline-theme.css';
import { applyGuidelineTheme } from './guidelineTheme';

applyGuidelineTheme();

/** Width of the guideline content area each toolbar option represents; `null` is the full page width. */
const CONTENT_WIDTHS: Record<string, number | null> = {
    content: 800,
    wide: 1024,
    narrow: 360,
    full: null,
};

const CONTENT_AREA_PADDING = 32;
const OUTSIDE_CONTENT_COLOR = 'rgb(236, 238, 241)';

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
            description: 'Width of the guideline content area the block sits in',
            toolbar: {
                title: 'Width',
                icon: 'grow',
                items: [
                    { value: 'content', title: 'Content area (800px)' },
                    { value: 'wide', title: 'Wide (1024px)' },
                    { value: 'narrow', title: 'Narrow (360px)' },
                    { value: 'full', title: 'Full width' },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: { mode: 'view', width: 'content' },
    decorators: [
        // A white guideline content area centred on a grey page, so it's clear where the block's space ends.
        (Story, { globals }) => {
            const contentWidth = CONTENT_WIDTHS[globals.width as string] ?? CONTENT_WIDTHS.content;
            return (
                <div
                    style={{
                        minHeight: '100vh',
                        backgroundColor: contentWidth
                            ? OUTSIDE_CONTENT_COLOR
                            : 'var(--f-theme-settings-background-color)',
                    }}
                >
                    <div
                        style={{
                            maxWidth: contentWidth ? contentWidth + 2 * CONTENT_AREA_PADDING : undefined,
                            minHeight: '100vh',
                            margin: '0 auto',
                            padding: `48px ${CONTENT_AREA_PADDING}px`,
                            backgroundColor: 'var(--f-theme-settings-background-color)',
                            // Like the guideline, keep the block's own z-indexes (e.g. sortable items) from
                            // stacking above portalled flyouts such as the item toolbar menu.
                            isolation: 'isolate',
                        }}
                    >
                        <Story />
                    </div>
                </div>
            );
        },
    ],
    parameters: {
        layout: 'fullscreen',
        controls: { expanded: true, sort: 'requiredFirst' },
    },
};

export default preview;
