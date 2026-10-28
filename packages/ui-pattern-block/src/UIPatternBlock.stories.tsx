/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';

import { Alignment, Padding, SandpackTemplate, SandpackTheme, TextAlignment } from './types';

import definition from './index';

export default { title: 'Blocks/UI Pattern', ...blockMeta(definition) };

const title = JSON.stringify([{ type: 'imageTitle', children: [{ text: 'Primary button' }] }]);
const description = JSON.stringify([
    { type: 'imageCaption', children: [{ text: 'Use one primary button per view for the main action.' }] },
]);

const buttonFiles = {
    [SandpackTemplate.Vanilla]: {
        '/index.html': '<button class="button">Get started</button>',
        '/styles.css': `.button {
  font: 600 15px/1 system-ui, sans-serif;
  padding: 12px 20px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: #4f46e5;
  cursor: pointer;
}
.button:hover { background: #4338ca; }`,
        '/app.js': 'document.querySelector(".button").addEventListener("click", () => console.log("clicked"));',
    },
};

export const Empty: BlockStory = {};

export const Button: BlockStory = {
    args: { title, description, files: buttonFiles },
};

export const CentredWithBackground: BlockStory = {
    args: {
        title,
        description,
        files: buttonFiles,
        alignment: Alignment.Center,
        labelPosition: TextAlignment.Bottom,
        hasBackground: true,
        backgroundColor: { red: 241, green: 243, blue: 249, alpha: 1 },
        paddingChoice: Padding.Medium,
    },
};

export const DarkThemeWithDependencies: BlockStory = {
    args: {
        title,
        files: buttonFiles,
        sandpackTheme: SandpackTheme.NightOwl,
        showResetButton: true,
        showSandboxLink: true,
        showNpmDependencies: true,
        dependencies: { [SandpackTemplate.Vanilla]: { npm: '{"canvas-confetti": "^1.9.3"}', external: '' } },
    },
};
