/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type BlockConfigExport } from '@frontify/guideline-blocks-settings';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { type AppBridgeStubOptions, BlockPreview } from './BlockPreview';
import { getBlockArgTypes, getDefaultBlockSettings, getSettingChangeHandlers } from './settingsToArgs';

export type BlockStoryParameters = {
    /** Passed to the app-bridge stub, e.g. `blockAssets`, `privacySettings`, `blockTemplates`. */
    appBridge?: AppBridgeStubOptions;
};

/** Story args are the block settings; there are no component props beyond the stubbed `appBridge`. */
export type BlockStory = StoryObj<{ [settingId: string]: unknown }> & {
    parameters?: BlockStoryParameters & Record<string, unknown>;
};

/**
 * Builds a block stories file's default export from its `defineBlock` config:
 * settings defaults become the initial args, sidebar settings become controls,
 * and the toolbar's "Mode" switch toggles between view and edit mode.
 *
 * Storybook indexes stories statically, so spread this into an object literal that sets `title`:
 * `export default { title: 'Blocks/Audio', ...blockMeta(definition) };`
 */
export const blockMeta = ({ block, settings }: BlockConfigExport): Omit<Meta, 'title'> => {
    const settingChangeHandlers = getSettingChangeHandlers(settings);
    return {
        args: getDefaultBlockSettings(settings),
        argTypes: getBlockArgTypes(settings),
        // `useArgs` is a Storybook hook and has to be called from the story render function itself.
        render: function Render(args, { globals, parameters }) {
            const [, updateArgs] = useArgs();
            return (
                <BlockPreview
                    block={block}
                    blockSettings={args}
                    isEditing={globals.mode === 'edit'}
                    appBridge={(parameters as BlockStoryParameters).appBridge}
                    settingChangeHandlers={settingChangeHandlers}
                    onBlockSettingsChange={updateArgs}
                />
            );
        },
    };
};
