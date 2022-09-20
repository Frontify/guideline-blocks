/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EditorView } from '@codemirror/view';

import { Language } from '../../../types';
import { addExtensionIf } from '../utils';
import { headerPanel } from '../extensions';
import { useExtension } from './useExtension';

export const useHeaderPanel = (view: EditorView, language: Language, withHeading: boolean) => {
    useExtension(view, () => addExtensionIf(withHeading, headerPanel(language)), [language, withHeading]);
};
