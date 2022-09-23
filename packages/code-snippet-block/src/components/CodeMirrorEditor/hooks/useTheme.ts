/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';

import { Theme } from '../../../types';
import { getTheme } from '../utils';
import { useExtension } from './useExtension';

export const useTheme = (view: EditorView, theme: Theme) => {
    useExtension(view, () => getTheme(theme), [theme]);
};
