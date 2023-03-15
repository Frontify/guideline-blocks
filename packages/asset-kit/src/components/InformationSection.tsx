/* (c) Copyright Frontify Ltd., all rights reserved. */

import { hasRichTextValue, useGuidelineDesignTokens } from '@frontify/guideline-blocks-shared';
import {
    BoldPlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    RichTextEditor,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue';
import { Plugin, PluginProps } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/Plugin';
import { InformationSectionProps } from '../types';
import { useMemo } from 'react';

const DEFAULT_CONTENT_VALUE = '[{"type":"heading3","children":[{"text":""}]}]';

export const InformationSection = ({ description, isEditing, setBlockSettings, title }: InformationSectionProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new SoftBreakPlugin(), new TextStylePlugin() as Plugin<PluginProps>])
            .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
            .setPlugin([new ResetFormattingPlugin()]);
    }, []);

    const saveDescription = (newDescription: string) => {
        if (description !== newDescription) {
            setBlockSettings({ description: newDescription });
        }
    };

    const saveTitle = (newTitle: string) => {
        if (title !== newTitle) {
            setBlockSettings({ title: newTitle });
        }
    };

    return (
        <div className="tw-flex-1 tw-space-y-2">
            {hasRichTextValue(title) || isEditing ? (
                <div data-test-id="block-title">
                    <RichTextEditor
                        designTokens={designTokens}
                        value={title ?? DEFAULT_CONTENT_VALUE}
                        readonly={!isEditing}
                        onBlur={saveTitle}
                        placeholder={isEditing ? 'Add a title here ...' : ''}
                        border={false}
                        plugins={customTitlePlugins}
                    />
                </div>
            ) : null}

            {hasRichTextValue(description) || isEditing ? (
                <div data-test-id="block-description">
                    <RichTextEditor
                        designTokens={designTokens}
                        readonly={!isEditing}
                        onBlur={saveDescription}
                        placeholder={isEditing ? 'Add a description here ...' : ''}
                        value={description}
                        border={false}
                    />
                </div>
            ) : null}
        </div>
    );
};
