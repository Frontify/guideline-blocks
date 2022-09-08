/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Bundle } from '@frontify/guideline-blocks-settings';
import { describe, expect, test, vi } from 'vitest';
import { appendUnit } from './appendUnit';

describe('appendUnit', () => {
    test('it should set correct value with "px" when entering a number', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: 20 };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getAppBridge(): AppBridgeBlock {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };

        const setBlockValueSpy = vi.spyOn(bundle, 'setBlockValue');
        appendUnit(bundle, 'my_setting_id');

        expect(setBlockValueSpy).toHaveBeenCalledWith('my_setting_id', '20px');
    });

    test('it should set correct value with "%" when entering a number', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: 40 };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getAppBridge(): AppBridgeBlock {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };

        const setBlockValueSpy = vi.spyOn(bundle, 'setBlockValue');
        appendUnit(bundle, 'my_setting_id', '%');

        expect(setBlockValueSpy).toHaveBeenCalledWith('my_setting_id', '40%');
    });

    test('it should not call setBlockValue when entering a px-value', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: '20px' };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getAppBridge(): AppBridgeBlock {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setBlockValue(): void {},
        };
        const setBlockValueSpy = vi.spyOn(bundle, 'setBlockValue');
        appendUnit(bundle, 'my_setting_id');
        expect(setBlockValueSpy).not.toHaveBeenCalledWith('my_setting_id', '20px');
    });

    test('it should handle undefined', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: undefined };
            },
            setBlockValue: vi.fn(),
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getAppBridge(): AppBridgeBlock {},
        };
        appendUnit(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).not.toHaveBeenCalled();
    });

    test('it should handle empty string', () => {
        const bundle: Bundle = {
            getBlock() {
                return { value: '' };
            },
            setBlockValue: vi.fn(),
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            getAppBridge(): AppBridgeBlock {},
        };
        appendUnit(bundle, 'my_setting_id');
        expect(bundle.setBlockValue).not.toHaveBeenCalled();
    });
});
