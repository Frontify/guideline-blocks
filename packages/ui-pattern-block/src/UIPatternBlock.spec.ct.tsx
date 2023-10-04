/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mount } from 'cypress/react18';
import { withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { UIPatternBlock } from './UIPatternBlock';
import { DEFAULT_BLOCK_SETTINGS, toolbarButtons } from './helpers';
import { Height, Padding, SandpackTemplate } from './types';
import { Radius } from '@frontify/guideline-blocks-settings';

const UiPatternBlockSelector = '[data-test-id="ui-pattern-block"]';
const UiPatternBlockWrapperSelector = '[data-test-id="ui-pattern-block-wrapper"]';
const ToolbarTabButtonSelector = '[data-test-id="toolbar-tab-btn"]';
const ToolbarSelector = '[data-test-id="ui-pattern-files-toolbar"]';
const ToolbarIconButtonSelector = '[data-test-id="toolbar-icon-btn"]';
const CodeEditorSelector = '.sp-code-editor';
const CodePreviewSelector = '.sp-preview';
const DependencyAccordionSelector = '[data-test-id="dependency-accordion"]';
const ResponsivePreviewSelector = '[data-test-id="ui-pattern-responsive-preview"]';
const ResponsivePreviewCloseButtonSelector = '[data-test-id="ui-pattern-responsive-preview-close-btn"]';
const ResponsivePreviewDeviceButtonSelector = '[data-test-id="ui-pattern-responsive-preview-device-button"]';
const ResponsivePreviewDeviceSelector = '[data-test-id="ui-pattern-responsive-preview-device"]';
const DependencyAccordionChildrenSelector = '[data-test-id="dependency-accordion-children"]';
const DependencyErrorSelector = '[data-test-id="dependency-invalid-json"]';
const RichTextEditor = '[data-test-id="rich-text-editor"]';
const RichTextEditorHtml = '[data-test-id="rte-content-html"]';

const templates = [
    SandpackTemplate.Vanilla,
    SandpackTemplate.Angular,
    SandpackTemplate.React,
    SandpackTemplate.Svelte,
    SandpackTemplate.Vue,
];

const assertDefaultSettings = () => {
    cy.get(UiPatternBlockSelector).should('exist');
    cy.get(ToolbarIconButtonSelector).should('have.length', 4);
    cy.get(ToolbarTabButtonSelector).as('Tabs');
    cy.get('@Tabs').should('have.length', 3);
    cy.get('@Tabs').eq(0).should('contain.text', 'HTML');
    cy.get('@Tabs').eq(1).should('contain.text', 'CSS');
    cy.get('@Tabs').eq(2).should('contain.text', 'Javascript');
    cy.get(CodeEditorSelector).should('exist');
    cy.get(CodeEditorSelector).should('contain.text', 'Hello world!');
};

describe('UI Pattern Block', () => {
    beforeEach(() => {
        cy.intercept('**');
    });
    it('renders an empty ui pattern block with default settings in edit mode', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: true,
            blockId: 1,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS },
        });
        mount(<UIPatternBlockWithStubs />);
        assertDefaultSettings();
        cy.get(RichTextEditor).should('have.length', 2);
        cy.get(DependencyAccordionChildrenSelector).should('have.length', 2);
    });

    it('renders an empty ui pattern block with default settings in view mode', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 2,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS },
        });
        mount(<UIPatternBlockWithStubs />);
        assertDefaultSettings();
        cy.get(RichTextEditor).should('have.length', 0);
        cy.get(DependencyAccordionChildrenSelector).should('have.length', 0);
    });

    it('renders title and description', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 3,
            blockSettings: {
                ...DEFAULT_BLOCK_SETTINGS,
                title: '[{"type":"p","children":[{"text":"Test1"}]}]',
                description: '[{"type":"p","children":[{"text":"Test2"}]}]',
            },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(RichTextEditorHtml).eq(0).should('contain.text', 'Test1');
        cy.get(RichTextEditorHtml).eq(1).should('contain.text', 'Test2');
    });

    it('renders the saved code in the code editor', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 4,
            blockSettings: {
                ...DEFAULT_BLOCK_SETTINGS,
                files: {
                    [SandpackTemplate.Vanilla]: {
                        '/index.html': 'Testing',
                    },
                },
            },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(CodeEditorSelector).should('contain.text', 'Testing');
    });

    it('renders the correct code in the code editor on tab switch', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 5,
            blockSettings: {
                ...DEFAULT_BLOCK_SETTINGS,
                files: {
                    [SandpackTemplate.Vanilla]: {
                        '/index.html': 'Testing',
                        '/app.js': 'console.log("Hello")',
                    },
                },
            },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(CodeEditorSelector).should('contain.text', 'Testing');
        cy.get(ToolbarTabButtonSelector).eq(2).click();
        cy.get(CodeEditorSelector).should('contain.text', 'console.log("Hello")');
    });

    it('does not render the code editor if it is set in the settings', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 6,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS, showCode: false },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(CodeEditorSelector).should('not.exist');
        cy.get(ToolbarSelector).should('not.exist');
    });

    it('collapses the code editor if it is set in the settings', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 7,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS, shouldCollapseCodeByDefault: true },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(CodeEditorSelector).should('not.exist');
        cy.get(ToolbarSelector).should('exist');
        cy.get(ToolbarTabButtonSelector).eq(0).click();
        cy.get(CodeEditorSelector).should('exist');
    });

    it('renders the dependencies if it is set in the settings', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 8,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS, showNpmDependencies: false, showExternalDependencies: true },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(DependencyAccordionSelector).should('have.length', 1);
    });

    it('does not collapse the dependencies if it is set in the settings', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 9,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS, shouldCollapseDependenciesByDefault: false },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(DependencyAccordionChildrenSelector).should('have.length', 2);
    });

    it('renders the saved dependencies', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 10,
            blockSettings: {
                ...DEFAULT_BLOCK_SETTINGS,
                shouldCollapseDependenciesByDefault: false,
                dependencies: {
                    [SandpackTemplate.Vanilla]: {
                        npm: JSON.stringify({
                            foo: 'latest',
                            bar: 'latest',
                        }),
                        external: JSON.stringify(['/foo.js', '/bar.js']),
                    },
                },
            },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(DependencyAccordionChildrenSelector).eq(0).should('contain.text', '{"foo":"latest","bar":"latest"}');
        cy.get(DependencyAccordionChildrenSelector).eq(1).should('contain.text', '["/foo.js","/bar.js"]');
    });

    it('renders the error message if the JSON is invalid', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: true,
            blockId: 11,
            blockSettings: {
                ...DEFAULT_BLOCK_SETTINGS,
            },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(DependencyAccordionChildrenSelector).eq(0).click().type('Invalid JSON');
        cy.get(CodePreviewSelector).click();
        cy.get(DependencyErrorSelector).should('exist');
    });

    it('does not render toolbar icon buttons if set in the settings', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 12,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS, showSandboxLink: false, showResetButton: false },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(ToolbarIconButtonSelector).should('have.length', 2);
    });

    it('opens the responsive preview on button click and changes preview width', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 13,
            blockSettings: { ...DEFAULT_BLOCK_SETTINGS, showSandboxLink: false, showResetButton: false },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(ToolbarIconButtonSelector).eq(1).click();
        cy.get(ResponsivePreviewSelector).should('exist');
        cy.get(ResponsivePreviewDeviceSelector).should('have.css', 'width', '1440px');
        cy.get(ResponsivePreviewDeviceButtonSelector).eq(1).click();
        cy.get(ResponsivePreviewDeviceSelector).should('have.css', 'width', '834px');
        cy.get(ResponsivePreviewCloseButtonSelector).click();
        cy.get(ResponsivePreviewSelector).should('not.exist');
    });

    it('renders with correct styles', () => {
        const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
            editorState: false,
            blockId: 14,
            blockSettings: {
                ...DEFAULT_BLOCK_SETTINGS,
                paddingChoice: Padding.Medium,
                heightChoice: Height.Large,
                radiusChoice: Radius.Medium,
                borderColor: { r: 255, g: 0, b: 0 },
                hasBackground: true,
                backgroundColor: { r: 0, g: 255, b: 0 },
            },
        });
        mount(<UIPatternBlockWithStubs />);
        cy.get(UiPatternBlockWrapperSelector).should('have.css', 'border', '1px solid rgb(255, 0, 0)');
        cy.get(UiPatternBlockWrapperSelector).should('have.css', 'border-radius', '4px');
        cy.get(CodePreviewSelector).should('have.css', 'background-color', 'rgb(0, 255, 0)');
        cy.get(CodePreviewSelector).should('have.css', 'height', '300px');
        cy.get(CodePreviewSelector).should('have.css', 'padding', '20px');
    });

    for (const [index, template] of templates.entries()) {
        it(`renders the correct toolbar buttons for template: ${template}`, () => {
            const [UIPatternBlockWithStubs] = withAppBridgeBlockStubs(UIPatternBlock, {
                editorState: true,
                blockId: 15 + index,
                blockSettings: { ...DEFAULT_BLOCK_SETTINGS, sandpackTemplate: template },
            });
            mount(<UIPatternBlockWithStubs />);
            for (const [i, tab] of toolbarButtons[template].entries()) {
                cy.get(ToolbarTabButtonSelector).eq(i).should('exist');
                cy.get(ToolbarTabButtonSelector).eq(i).should('contain.text', tab.label);
            }
        });
    }
});
