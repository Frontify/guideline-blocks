/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BlockConfigExport } from '@frontify/guideline-blocks-settings';
import { type ArgTypes } from '@storybook/react-vite';

type BlockSettingsStructure = Exclude<BlockConfigExport['settings'], () => unknown>;

/**
 * Loose view of a settings entry: only the fields needed to derive a default value and a control.
 * The real `SettingBlock` union is too wide to narrow usefully here.
 */
type SettingEntry = {
    id?: string;
    type?: string;
    label?: string;
    defaultValue?: unknown;
    choices?: unknown;
    onChange?: (bundle: SettingsBundle) => void;
    on?: SettingEntry[];
    off?: SettingEntry[];
    blocks?: SettingEntry[];
};

/** The slice of the sidebar's settings bundle that `onChange` helpers such as `appendUnit` use. */
type SettingsBundle = {
    getBlock: (id: string) => { value?: unknown } | null;
    setBlockValue: (id: string, value: unknown) => void;
    getAppBridge: () => unknown;
};

type Choice = { value: string | number; label?: string };

const resolveStructure = (settings: BlockConfigExport['settings']): BlockSettingsStructure => {
    const structure = typeof settings === 'function' ? settings() : settings;
    if (structure instanceof Promise) {
        throw new TypeError('Async block settings are not supported in Storybook previews yet.');
    }
    return structure;
};

const walkEntries = (entries: SettingEntry[], visit: (entry: SettingEntry) => void) => {
    for (const entry of entries) {
        visit(entry);
        for (const children of [entry.on, entry.off, entry.blocks]) {
            if (Array.isArray(children)) {
                walkEntries(children, visit);
            }
        }
    }
};

const forEachSetting = (
    settings: BlockConfigExport['settings'],
    visit: (entry: SettingEntry, section: string) => void
) => {
    for (const [section, entries] of Object.entries(resolveStructure(settings))) {
        if (Array.isArray(entries)) {
            walkEntries(entries as SettingEntry[], (entry) => visit(entry, section));
        }
    }
};

/** Collects every `defaultValue` the guideline host would apply when the block is first inserted. */
export const getDefaultBlockSettings = (settings: BlockConfigExport['settings']): Record<string, unknown> => {
    const defaults: Record<string, unknown> = {};
    forEachSetting(settings, (entry) => {
        if (entry.id && entry.defaultValue !== undefined) {
            defaults[entry.id] = entry.defaultValue;
        }
    });
    return defaults;
};

const getChoices = (entry: SettingEntry): Choice[] | undefined =>
    Array.isArray(entry.choices) ? (entry.choices as Choice[]) : undefined;

const toControl = (entry: SettingEntry): ArgTypes[string]['control'] | undefined => {
    switch (entry.type) {
        case 'switch':
            return 'boolean';
        case 'input':
        case 'textarea':
            return 'text';
        case 'dropdown':
        case 'segmentedControls':
        case 'checklist':
            return getChoices(entry) ? (entry.type === 'checklist' ? 'check' : 'select') : undefined;
        default:
            return undefined;
    }
};

/** Maps the block's sidebar settings to Storybook controls, grouped by sidebar section. */
export const getBlockArgTypes = (settings: BlockConfigExport['settings']): ArgTypes => {
    const argTypes: ArgTypes = {};
    forEachSetting(settings, (entry, section) => {
        const control = entry.id ? toControl(entry) : undefined;
        if (!entry.id || !control) {
            return;
        }
        const choices = getChoices(entry);
        argTypes[entry.id] = {
            name: entry.id,
            description: entry.label,
            control,
            table: { category: section },
            ...(choices && {
                options: choices.map((choice) => choice.value),
                control: {
                    type: control as 'select' | 'check',
                    labels: Object.fromEntries(choices.map((choice) => [choice.value, choice.label ?? choice.value])),
                },
            }),
        };
    });
    return argTypes;
};

/** Collects each setting's `onChange` hook, keyed by setting id. */
export const getSettingChangeHandlers = (
    settings: BlockConfigExport['settings']
): Record<string, NonNullable<SettingEntry['onChange']>> => {
    const handlers: Record<string, NonNullable<SettingEntry['onChange']>> = {};
    forEachSetting(settings, (entry) => {
        if (entry.id && entry.onChange) {
            handlers[entry.id] = entry.onChange;
        }
    });
    return handlers;
};

/**
 * Runs the `onChange` hooks of every setting that differs between `previous` and `next`, as the
 * guideline sidebar does when a setting is edited (e.g. `appendUnit` turning `20` into `20px`,
 * or `presetCustomValue` filling custom inputs when a switch flips). Returns the settings with
 * the hooks' writes applied, or `next` itself when no hook changed anything.
 */
export const applySettingChangeHandlers = (
    handlers: ReturnType<typeof getSettingChangeHandlers>,
    previous: Record<string, unknown>,
    next: Record<string, unknown>,
    appBridge: unknown
): Record<string, unknown> => {
    const changedIds = Object.keys(handlers).filter((id) => JSON.stringify(previous[id]) !== JSON.stringify(next[id]));
    if (changedIds.length === 0) {
        return next;
    }

    const result = { ...next };
    let hasWrites = false;
    const bundle: SettingsBundle = {
        getBlock: (id) => ({ value: result[id] }),
        setBlockValue: (id, value) => {
            if (JSON.stringify(result[id]) !== JSON.stringify(value)) {
                result[id] = value;
                hasWrites = true;
            }
        },
        getAppBridge: () => appBridge,
    };
    for (const id of changedIds) {
        handlers[id](bundle);
    }
    return hasWrites ? result : next;
};
