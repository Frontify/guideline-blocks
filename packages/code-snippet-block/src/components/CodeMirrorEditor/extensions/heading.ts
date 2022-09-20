/* (c) Copyright Frontify Ltd., all rights reserved. */

import { showPanel } from '@codemirror/panel';
import { Extension, StateField } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

const DEFAULT_TITLE = '';

const headerPanelTheme = EditorView.baseTheme({
    '.cm-header-panel': {
        padding: '10px 12px',
        fontFamily: 'Space Grotesk Frontify',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '16px',
        letterSpacing: '0em',
        textAlign: 'left',
    },
});

export const headerPanel = (title?: string): Extension => {
    const createHeaderPanel = () => {
        const dom = document.createElement('div');
        dom.textContent = title?.toUpperCase() ?? DEFAULT_TITLE;
        dom.setAttribute('data-test-id', 'code-snippet-header');
        dom.className = 'cm-header-panel';
        return { top: true, dom };
    };

    const headerPanelState = StateField.define<boolean>({
        create: () => true,
        update: (value) => value,
        provide: (field) => showPanel.from(field, (on) => (on ? createHeaderPanel : null)),
    });

    return [headerPanelState, headerPanelTheme];
};
