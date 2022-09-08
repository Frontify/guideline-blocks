/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Language } from '../../../types';
import { getLanguage } from '../utils';
import { useExtension } from './useExtension';

export const useLanguage = (view: EditorView, language: Language) => {
    useExtension(view, () => getLanguage(language), [language]);
};
