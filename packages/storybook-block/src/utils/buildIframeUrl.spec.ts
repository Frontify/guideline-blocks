/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { StorybookPosition } from '../types';
import { buildIframeUrl } from './buildIframeUrl';

describe('buildIframeUrl', () => {
    test('It should return a valid storybook url', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu',
            true,
            StorybookPosition.Horizontal
        );
        expect(result?.toString()).toEqual(
            'http://fondue-components.frontify.com/?path=%2Fstory%2Fcomponents-action-menu--action-menu&nav=false&panel=right'
        );
    });
    test('It should return null if empty', () => {
        const result = buildIframeUrl('', false, StorybookPosition.Horizontal);
        expect(result).toBeNull();
    });
    test('It should return null if invalid storybook url', () => {
        const result = buildIframeUrl('www.google.ch', false, StorybookPosition.Horizontal);
        expect(result).toBeNull();
    });
    test('It should return null if invalid storybook url', () => {
        const result = buildIframeUrl('www.google.ch', false, StorybookPosition.Horizontal);
        expect(result).toBeNull();
    });
    test('It should set panel to default right if addon enabled', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu',
            true,
            StorybookPosition.Horizontal
        );
        expect(result?.toString()).toContain('panel=right');
    });
    test('It should set panel to bottom if addon enabled and positioning vertical', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu',
            true,
            StorybookPosition.Vertical
        );
        expect(result?.toString()).toContain('panel=bottom');
    });
    test('It should set panel if addon enabled', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu',
            false,
            StorybookPosition.Horizontal
        );
        expect(result?.toString()).toContain('panel=false');
    });
    test('It should add iframe to path when addons are disabled', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu',
            false,
            StorybookPosition.Horizontal
        );
        expect(result?.toString()).toContain('iframe.html');
    });
    test('It should not append iframe when addons are enabled', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/?path=/story/components-action-menu--action-menu',
            true,
            StorybookPosition.Horizontal
        );
        expect(result?.toString()).not.toContain('iframe.html');
    });
    test('It should remove iframe when addons are enabled', () => {
        const result = buildIframeUrl(
            'http://fondue-components.frontify.com/iframe.html?path=/story/components-action-menu--action-menu',
            true,
            StorybookPosition.Horizontal
        );
        expect(result?.toString()).not.toContain('iframe.html');
    });
});
