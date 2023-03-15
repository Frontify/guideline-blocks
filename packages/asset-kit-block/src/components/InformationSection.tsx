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
    parseRawValue,
    serializeRawToHtml,
} from '@frontify/fondue';
import { Plugin, PluginProps } from '@frontify/fondue/dist/components/RichTextEditor/Plugins/Plugin';
import { InformationSectionProps } from '../types';
import { useMemo } from 'react';

const DEFAULT_CONTENT_VALUE = '[{"type":"heading3","children":[{"text":""}]}]';

export const InformationSection = ({ description, isEditing, setBlockSettings, title }: InformationSectionProps) => {
    const { designTokens } = useGuidelineDesignTokens();

    const rawTitleValue = JSON.stringify(parseRawValue({ raw: title }));
    const htmlTitle = serializeRawToHtml(rawTitleValue, designTokens);
    const rawDescriptionValue = JSON.stringify(parseRawValue({ raw: description }));
    const htmlDescription = serializeRawToHtml(rawDescriptionValue, designTokens);

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
            <div data-test-id="block-title">
                {!isEditing ? (
                    <>
                        {hasRichTextValue(title) && (
                            <div data-test-id="block-title-rte" dangerouslySetInnerHTML={{ __html: htmlTitle }} />
                        )}
                    </>
                ) : (
                    <RichTextEditor
                        designTokens={designTokens}
                        value={title ?? DEFAULT_CONTENT_VALUE}
                        onBlur={saveTitle}
                        placeholder="Add a title here ..."
                        border={false}
                        plugins={customTitlePlugins}
                    />
                )}
            </div>

            <div data-test-id="block-description">
                {!isEditing ? (
                    <>
                        {hasRichTextValue(description) && (
                            <div
                                data-test-id="block-description-rte"
                                dangerouslySetInnerHTML={{ __html: htmlDescription }}
                            />
                        )}
                    </>
                ) : (
                    <RichTextEditor
                        designTokens={designTokens}
                        onBlur={saveDescription}
                        placeholder="Add a description here ..."
                        value={description}
                        border={false}
                    />
                )}
            </div>
        </div>
    );
};
