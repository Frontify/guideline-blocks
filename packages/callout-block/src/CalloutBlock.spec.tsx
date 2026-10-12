/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readability } from '@ctrl/tinycolor';
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CalloutBlock } from './CalloutBlock';
import { getEffectiveBackgroundColor } from './helpers/color';
import { ICON_ASSET_ID } from './settings';
import { Alignment, Appearance, Icon, Padding, Type, Width } from './types';

const CALLOUT_BLOCK_TEST_ID = 'callout-block';
const RICH_TEXT_EDITOR_TEST_ID = 'rich-text-editor';
const HTML_CONTENT_TEST_ID = 'rte-content-html';
const CALLOUT_ICON_WRAPPER_TEST_ID = 'callout-icon-wrapper';
const CALLOUT_ICON_CUSTOM_TEST_ID = 'callout-icon-custom';
const CALLOUT_ICON_INFO_TEST_ID = 'callout-icon-info';

/** WCAG AA contrast for normal text — asserted via TinyColor, independent of production's own contrast math. */
const MIN_WCAG_AA_CONTRAST = 4.5;

const EXAMPLE_THEME_SETTINGS: Record<string, string> = {
    '--f-theme-settings-accent-color-info-color': 'rgba(26, 199, 211, 1)',
    '--f-theme-settings-accent-color-note-color': 'rgba(246, 216, 56, 1)',
    '--f-theme-settings-accent-color-tip-color': 'rgba(42, 191, 24, 1)',
    '--f-theme-settings-accent-color-warning-color': 'rgba(222, 27, 27, 1)',
};

const WHITE_SCHEME = 'rgb(255, 255, 255)';

const originalGetComputedStyle = window.getComputedStyle.bind(window);

/**
 * Happy-dom doesn't cascade custom properties from a `:root` stylesheet, so serve the
 * theme variables the block reads through `getComputedStyle` directly.
 */
const mockThemeSettings = (themeSettings: Record<string, string>) => {
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) => {
        const style = originalGetComputedStyle(element, pseudoElement);
        const getPropertyValue = style.getPropertyValue.bind(style);
        style.getPropertyValue = (property: string) => themeSettings[property] ?? getPropertyValue(property);
        return style;
    });
};

// RichTextEditor only mounts the editable editor once its container is reported in the viewport;
// happy-dom's IntersectionObserver never fires, so report every observed element as intersecting.
class IntersectingObserver {
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback(
            [{ isIntersecting: true, target } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver
        );
    }

    unobserve() {}

    disconnect() {}
}

const renderCalloutBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [CalloutBlockWithStubs, appBridge] = withAppBridgeBlockStubs(CalloutBlock, appBridgeProps);
    const utils = render(<CalloutBlockWithStubs />);
    return { ...utils, appBridge };
};

const expectReadableAdjustedTextColor = async (accentRgb: string) => {
    await waitFor(() => {
        const textColor = screen.getByTestId(CALLOUT_BLOCK_TEST_ID).style.color;
        expect(textColor).not.toBe('');
        expect(textColor).not.toBe(accentRgb);
        expect(readability(textColor, getEffectiveBackgroundColor(accentRgb, WHITE_SCHEME))).toBeGreaterThanOrEqual(
            MIN_WCAG_AA_CONTRAST
        );
    });
};

const expectThemeTextColorsMatchBlockColor = async (accentRgb: string) => {
    await waitFor(() => {
        const block = screen.getByTestId(CALLOUT_BLOCK_TEST_ID);
        const heading = block.style.getPropertyValue('--f-theme-settings-heading1-color').trim();
        const body = block.style.getPropertyValue('--f-theme-settings-body-color').trim();
        const link = block.style.getPropertyValue('--f-theme-settings-link-color').trim();

        expect(heading).toBe(body);
        expect(body).toBe(link);
        expect(heading.length).toBeGreaterThan(0);
        expect(
            readability(block.style.color, getEffectiveBackgroundColor(accentRgb, WHITE_SCHEME))
        ).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
    });
};

describe('Callout Block', () => {
    beforeEach(() => {
        vi.stubGlobal('IntersectionObserver', IntersectingObserver);
        mockThemeSettings(EXAMPLE_THEME_SETTINGS);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('should render a callout block in edit mode', async () => {
        renderCalloutBlock({ editorState: true });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toBeInTheDocument();
        expect(await screen.findByTestId(RICH_TEXT_EDITOR_TEST_ID)).toBeInTheDocument();
    });

    it('should not be able to input to a callout block when in view mode', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'Text value' } });

        await waitFor(() => {
            expect(screen.getByTestId(HTML_CONTENT_TEST_ID)).toHaveTextContent('Text value');
        });
        expect(screen.queryByTestId(RICH_TEXT_EDITOR_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render a callout block with the correct layout settings', () => {
        renderCalloutBlock({
            blockSettings: {
                alignment: Alignment.Right,
                paddingChoice: Padding.L,
                width: Width.HugContents,
            },
        });

        const block = screen.getByTestId(CALLOUT_BLOCK_TEST_ID);
        expect(block).toHaveClass('tw-w-fit', 'tw-max-w-full');
        expect(block).toHaveClass('tw-ml-auto');
        expect(block).toHaveClass('tw-px-[30px]', 'tw-py-[25px]');
    });

    it('should render a callout block with the correct border radius style', () => {
        renderCalloutBlock({
            blockSettings: {
                hasExtendedCustomRadius: true,
                extendedRadiusTopLeft: '10px',
                extendedRadiusTopRight: '20px',
                extendedRadiusBottomLeft: '40px',
                extendedRadiusBottomRight: '30px',
            },
        });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ borderRadius: '10px 20px 30px 40px' });
    });

    it('should render a callout block with a predefined icon', () => {
        renderCalloutBlock({
            blockSettings: {
                iconSwitch: false,
                iconType: Icon.Info,
            },
        });

        expect(screen.getByTestId(CALLOUT_ICON_WRAPPER_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(CALLOUT_ICON_INFO_TEST_ID)).toBeInTheDocument();
    });

    it('should render a callout block with a custom icon', () => {
        renderCalloutBlock({
            blockAssets: {
                [ICON_ASSET_ID]: [AssetDummy.with(342)],
            },
            blockSettings: {
                iconSwitch: true,
                type: Type.Note,
            },
        });

        expect(screen.getByTestId(CALLOUT_ICON_WRAPPER_TEST_ID)).toBeInTheDocument();
        const customIcon = screen.getByTestId(CALLOUT_ICON_CUSTOM_TEST_ID);
        expect(customIcon).toHaveAttribute('alt', '');
        expect(customIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not render an icon when the icon type is none', () => {
        renderCalloutBlock({
            blockSettings: {
                iconSwitch: false,
                iconType: Icon.None,
            },
        });

        expect(screen.queryByTestId(CALLOUT_ICON_WRAPPER_TEST_ID)).not.toBeInTheDocument();
    });

    it('should not render a custom icon when no custom icon url is defined', () => {
        renderCalloutBlock({
            blockSettings: {
                iconSwitch: true,
                iconType: Icon.Info,
            },
        });

        expect(screen.queryByTestId(CALLOUT_ICON_CUSTOM_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render a callout block with the correct colors for type info', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'This is an info', type: Type.Info } });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(26, 199, 211, 0.1)' });
        await expectReadableAdjustedTextColor('rgb(26, 199, 211)');
    });

    it('should render a callout block with the correct colors for type note', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'This is a note', type: Type.Note } });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(246, 216, 56, 0.1)' });
        await expectReadableAdjustedTextColor('rgb(246, 216, 56)');
    });

    it('should render a callout block with the correct colors for type tip', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'This is a tip', type: Type.Tip } });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(42, 191, 24, 0.1)' });
        await expectReadableAdjustedTextColor('rgb(42, 191, 24)');
    });

    it('should render a callout block with the correct colors for type warning', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'This is a warning', type: Type.Warning } });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(222, 27, 27, 0.1)' });
        await expectReadableAdjustedTextColor('rgb(222, 27, 27)');
    });

    it('should overwrite the theme css variables for a warning block', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'This is a warning', type: Type.Warning } });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(222, 27, 27, 0.1)' });
        await expectThemeTextColorsMatchBlockColor('rgb(222, 27, 27)');
    });

    it('should overwrite the theme css variables for a note block', async () => {
        renderCalloutBlock({ blockSettings: { textValue: 'This is a note', type: Type.Note } });

        expect(screen.getByTestId(CALLOUT_BLOCK_TEST_ID)).toHaveStyle({ backgroundColor: 'rgba(246, 216, 56, 0.1)' });
        await expectThemeTextColorsMatchBlockColor('rgb(246, 216, 56)');
    });

    it('should render a callout block with light appearance', async () => {
        mockThemeSettings({ '--f-theme-settings-accent-color-note-color': 'rgba(50, 40, 145, 1)' });

        renderCalloutBlock({
            blockSettings: { textValue: 'This is a note', type: Type.Note, appearance: Appearance.Light },
        });

        const block = screen.getByTestId(CALLOUT_BLOCK_TEST_ID);
        expect(block).toHaveStyle({ backgroundColor: 'rgba(50, 40, 145, 0.1)' });
        await waitFor(() => {
            expect(block).toHaveStyle({ color: 'rgba(50, 40, 145, 1)' });
        });
    });

    it('should use a lighter readable text color when a black accent sits on a black section background', async () => {
        mockThemeSettings({
            '--f-theme-settings-accent-color-note-color': 'rgba(0, 0, 0, 1)',
            '--f-theme-settings-background-color': 'rgb(0, 0, 0)',
        });

        renderCalloutBlock({
            blockSettings: { textValue: 'This is a note', type: Type.Note, appearance: Appearance.Light },
        });

        const block = screen.getByTestId(CALLOUT_BLOCK_TEST_ID);
        expect(block).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.1)' });
        await waitFor(() => {
            const textColor = block.style.color;
            expect(textColor).not.toBe('');
            expect(textColor).not.toBe('rgb(0, 0, 0)');
            expect(
                readability(textColor, getEffectiveBackgroundColor('rgb(0, 0, 0)', 'rgb(0, 0, 0)'))
            ).toBeGreaterThanOrEqual(MIN_WCAG_AA_CONTRAST);
        });
    });

    it('should render a callout block with strong appearance', async () => {
        mockThemeSettings({ '--f-theme-settings-accent-color-note-color': 'rgba(50, 40, 145, 1)' });

        renderCalloutBlock({
            blockSettings: { textValue: 'This is a note', type: Type.Note, appearance: Appearance.Strong },
        });

        const block = screen.getByTestId(CALLOUT_BLOCK_TEST_ID);
        expect(block).toHaveStyle({ backgroundColor: 'rgba(50, 40, 145, 1)' });
        await waitFor(() => {
            expect(block).toHaveStyle({ color: 'rgb(255, 255, 255)' });
        });
    });

    // TODO(vitest-migration): "renders a callout block with the content hugged" measured the rendered width
    // of a hug-contents block; happy-dom has no layout engine. The `tw-w-fit` class is covered by the layout test.
});
