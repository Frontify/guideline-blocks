/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { SandpackFiles } from '@codesandbox/sandpack-react/types';
import { Preprocessor, SandpackTemplate } from '../types';

export const getCssExtension = (preprocessor: Preprocessor) => {
    if (preprocessor === Preprocessor.SCSS) {
        return { extension: 'scss', label: 'SCSS' };
    }
    if (preprocessor === Preprocessor.LESS) {
        return { extension: 'less', label: 'LESS' };
    }
    return { extension: 'css', label: 'CSS' };
};

export const getDefaultFilesOfTemplate = (template: SandpackTemplate, preprocessor: Preprocessor): SandpackFiles => {
    const { extension } = getCssExtension(preprocessor);

    switch (template) {
        case SandpackTemplate.React: {
            return {
                '/styles.css': '',
            };
        }
        case SandpackTemplate.Angular: {
            return {
                '/src/app/app.component.css': '',
            };
        }
        case SandpackTemplate.Svelte: {
            return {
                '/styles.css': '',
            };
        }
        case SandpackTemplate.Vue: {
            return {
                '/src/styles.css': '',
            };
        }
        case SandpackTemplate.Vanilla: {
            return {
                '/index.html': '<h1>Hello world!</h1>',
                '/index.js': `import "./styles.${extension}"; require("./app.js");`,
                [`/styles.${extension}`]: '',
                '/app.js': '',
            };
        }
        default: {
            return {};
        }
    }
};

export const getToolbarButtons = (
    preprocessor: Preprocessor
): Record<SandpackTemplate, { file: string; label: string }[]> => {
    const { extension, label } = getCssExtension(preprocessor);

    return {
        [SandpackTemplate.React]: [
            {
                file: '/App.js',
                label: 'JSX',
            },
            {
                file: '/styles.css',
                label: 'CSS',
            },
        ],
        [SandpackTemplate.Angular]: [
            {
                file: '/src/app/app.component.html',
                label: 'HTML',
            },
            {
                file: '/src/app/app.component.css',
                label: 'CSS',
            },
            {
                file: '/src/app/app.component.ts',
                label: 'Typescript',
            },
        ],
        [SandpackTemplate.Svelte]: [
            {
                file: '/App.svelte',
                label: 'Svelte',
            },
            {
                file: '/styles.css',
                label: 'CSS',
            },
        ],
        [SandpackTemplate.Vue]: [
            {
                file: '/src/App.vue',
                label: 'Vue',
            },
            {
                file: '/src/styles.css',
                label: 'CSS',
            },
        ],
        [SandpackTemplate.Vanilla]: [
            {
                file: '/index.html',
                label: 'HTML',
            },
            {
                file: `/styles.${extension}`,
                label,
            },
            {
                file: '/app.js',
                label: 'Javascript',
            },
        ],
    };
};

export const initialActiveFile: Record<SandpackTemplate, string> = {
    [SandpackTemplate.React]: '/App.js',
    [SandpackTemplate.Angular]: '/src/app/app.component.html',
    [SandpackTemplate.Svelte]: '/App.svelte',
    [SandpackTemplate.Vue]: '/src/App.vue',
    [SandpackTemplate.Vanilla]: '/index.html',
};
