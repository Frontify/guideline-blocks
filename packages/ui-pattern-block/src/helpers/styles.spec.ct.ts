/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { getBackgroundCss, getCssToInject, getScriptToInject } from './style';

const clean = (str: string) => {
    return str.replaceAll(/\s+/g, ' ').trim();
};

describe('style helpers', () => {
    describe('getCssToInject', () => {
        it('generates the correct css for the inputs', () => {
            const testItems = [
                {
                    input: [true] as const,
                    output: `
                    html {
                        display: flex;
                        flex-direction: column;
                    }
                    body {
                        flex: 1;
                        padding: 8px;
                        margin: 0px;
                        display: flex;
                        flex-direction: column;
                    }
                `,
                },
                {
                    input: [false] as const,
                    output: `
                    html {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    body {
                        flex: 1;
                        padding: 8px;
                        margin: 0px;
                        display: flex;
                        flex-direction: column;
                    }
                `,
                },
                {
                    input: [true, 'background: red;', 'color: blue;'] as const,
                    output: `
                    html {
                        display: flex;
                        flex-direction: column;
                    }
                    body {
                        flex: 1;
                        padding: 8px;
                        margin: 0px;
                        display: flex;
                        flex-direction: column;
                        background: red;
                        color: blue;
                    }
                `,
                },
                {
                    input: [false, 'background: red;', 'color: blue;'] as const,
                    output: `
                    html {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    body {
                        flex: 1;
                        padding: 8px;
                        margin: 0px;
                        display: flex;
                        flex-direction: column;
                        background: red;
                        color: blue;
                    }
                `,
                },
            ];
            for (const testItem of testItems) {
                cy.wrap(clean(getCssToInject(testItem.input[0], ...(testItem.input.slice(1) as string[])))).should(
                    'eq',
                    clean(testItem.output)
                );
            }
        });
    });
    describe('getBackgroundCss', () => {
        it('generates the correct css for the inputs', () => {
            const testItems = [
                {
                    input: { red: 0, green: 0, blue: 255, alpha: 1 } as Color,
                    output: `
                    background-color: rgb(0, 0, 255);
                `,
                },
                {
                    input: { red: 0, green: 0, blue: 255, alpha: 0.5 } as Color,
                    output: `
                    background-color: rgba(0, 0, 255, 0.5);
                `,
                },
                {
                    input: { red: 0, green: 0, blue: 255 } as Color,
                    output: `
                    background-color: rgb(0, 0, 255);
                `,
                },
            ];
            for (const testItem of testItems) {
                cy.wrap(clean(getBackgroundCss(testItem.input))).should('eq', clean(testItem.output));
            }
        });
    });
    describe('getScriptToInject', () => {
        it('generates the correct script for the inputs', () => {
            const testItems = [
                {
                    input: 'h1 { color: red; }',
                    output: `data:text/javascript;base64,${btoa(`
        const tag = document.createElement('style');
        tag.innerHTML = \`h1 { color: red; }\`;
        document.head.appendChild(tag);
    `)}`,
                },
                {
                    input: `h1 { color: red; }
h2 { color: blue; }`,
                    output: `data:text/javascript;base64,${btoa(`
        const tag = document.createElement('style');
        tag.innerHTML = \`h1 { color: red; }
h2 { color: blue; }\`;
        document.head.appendChild(tag);
    `)}`,
                },
            ];
            for (const testItem of testItems) {
                cy.wrap(clean(getScriptToInject(testItem.input))).should('eq', clean(testItem.output));
            }
        });
    });
});
