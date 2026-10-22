/* (c) Copyright Frontify Ltd., all rights reserved. */

import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { sass } from '@codemirror/lang-sass';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { StreamLanguage } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { c, kotlin } from '@codemirror/legacy-modes/mode/clike';
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript';
import { go } from '@codemirror/legacy-modes/mode/go';
import { liveScript } from '@codemirror/legacy-modes/mode/livescript';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { csharp } from '@replit/codemirror-lang-csharp';
import { type Extension } from '@uiw/react-codemirror';

import { type Language } from './types';

// Only the selectable languages, set up the same way as in @uiw/codemirror-extensions-langs. Importing its `langs`
// map instead would bundle the grammars of all ~114 languages it supports.
export const languageExtensions: Record<Exclude<Language, 'plain'>, () => Extension> = {
    c: () => StreamLanguage.define(c),
    coffeescript: () => StreamLanguage.define(coffeeScript),
    cpp: () => cpp(),
    csharp: () => csharp(),
    css: () => css(),
    go: () => StreamLanguage.define(go),
    html: () => html(),
    java: () => java(),
    javascript: () => javascript(),
    json: () => json(),
    jsx: () => javascript({ jsx: true }),
    kotlin: () => StreamLanguage.define(kotlin),
    livescript: () => StreamLanguage.define(liveScript),
    markdown: () => markdown({ base: markdownLanguage, codeLanguages: languages }),
    php: () => php(),
    python: () => python(),
    sass: () => sass(),
    shell: () => StreamLanguage.define(shell),
    sql: () => sql(),
    swift: () => StreamLanguage.define(swift),
    tsx: () => javascript({ jsx: true, typescript: true }),
    typescript: () => javascript({ typescript: true }),
    xml: () => xml(),
    yaml: () => StreamLanguage.define(yaml),
};
