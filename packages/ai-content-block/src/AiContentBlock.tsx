/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from '@frontify/guideline-blocks-settings';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { ReactElement } from 'react';
import { Settings } from './types';
import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    CheckboxListPlugin,
    CodePlugin,
    ItalicPlugin,
    OrderedListPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    RichTextEditor,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { useDrunken, useKeytakeaways, usePrompted, useProperEnglish, useShortener } from './hooks';
import { useTranslator } from './hooks/useTranslator';
import { AiCopywriterPlugin } from './Plugin/AiCopyWriterPlugin';
import { AllTextStylePlugins, AllTextStyles, ButtonPlugin, LinkPlugin } from '@frontify/guideline-blocks-shared';

export const AiContentBlock = ({ appBridge }: BlockProps): ReactElement => {
    const isEditing = useEditorState(appBridge);
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const { drunken, isDrunkenLoading } = useDrunken();
    const { shortener, isShortenerLoading } = useShortener();
    const { properEnglish, isProperEnglishLoading } = useProperEnglish();
    const { prompted, isPromptedLoading } = usePrompted();
    const { translate, isTranslatorLoading } = useTranslator('swissGerman');
    const { keytakeaways, isKeytakeawaysLoading } = useKeytakeaways();
    const { content } = blockSettings;

    const isLoading =
        isDrunkenLoading ||
        isShortenerLoading ||
        isProperEnglishLoading ||
        isTranslatorLoading ||
        isKeytakeawaysLoading ||
        isPromptedLoading;

    const plugins = new PluginComposer();
    plugins.setPlugin([
        new TextStylePlugin({
            textStyles: AllTextStylePlugins,
        }),
        new SoftBreakPlugin(),
        new BoldPlugin(),
        new ItalicPlugin(),
        new UnderlinePlugin(),
        new StrikethroughPlugin(),
        new CodePlugin(),
        new LinkPlugin({ appBridge }),
        new ButtonPlugin({ appBridge }),
        new AlignLeftPlugin({
            validTypes: AllTextStyles,
        }),
        new AlignCenterPlugin({
            validTypes: AllTextStyles,
        }),
        new AlignRightPlugin({
            validTypes: AllTextStyles,
        }),
        new AlignJustifyPlugin({
            validTypes: AllTextStyles,
        }),
        new UnorderedListPlugin(),
        new CheckboxListPlugin(),
        new OrderedListPlugin(),
        new ResetFormattingPlugin(),
        new AiCopywriterPlugin({
            isLoading,
            aiCopywriters: [
                {
                    label: 'Plain Prompt',
                    function: prompted,
                },
                {
                    label: 'Drunken Pirate',
                    function: drunken,
                },
                {
                    label: 'Translate to Swiss German',
                    function: translate,
                },
                {
                    label: 'Use Proper English',
                    function: properEnglish,
                },
                {
                    label: 'Keytakeaways',
                    function: keytakeaways,
                },
                {
                    label: 'Shorten',
                    function: shortener,
                },
            ],
        }),
    ]);

    return (
        <RichTextEditor
            value={content}
            readonly={!isEditing}
            border={false}
            plugins={plugins}
            onTextChange={(content: string) => setBlockSettings({ content })}
        />
    );
};
