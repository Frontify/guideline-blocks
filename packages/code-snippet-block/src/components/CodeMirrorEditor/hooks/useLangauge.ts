/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';
import { Language } from '../../../types';
import { getLanguage } from '../utils';
import { useExtension } from './useExtension';

export const useLangauge = (view: EditorView, langauge: Language) => {
    useExtension(view, () => getLanguage(langauge), [langauge]);
};
