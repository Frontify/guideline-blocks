/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useMemo } from 'react';
import {
    BlockStyles,
    RichTextEditor,
    TextStylePluginsWithoutImage,
    TextStyles,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
} from '@frontify/guideline-blocks-settings';
import {
    AutoformatPlugin,
    BoldPlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    UnderlinePlugin,
} from '@frontify/fondue';
import { TemplateTextProps } from './types';

export const TemplateText = ({
    appBridge,
    updateBlockSettings,
    title,
    description,
    pageCount,
    isEditing,
    templateTextKey,
}: TemplateTextProps) => {
    const blockId = appBridge.context('blockId').get();
    const pageCountStyles = BlockStyles[TextStyles.imageCaption];
    const pageCountLabel = pageCount === 1 ? 'page' : 'pages';

    const saveTitle = useCallback(
        async (newTitle: string) => {
            if (title !== newTitle) {
                await updateBlockSettings({ title: newTitle });
            }
        },
        [title, updateBlockSettings],
    );

    const saveDescription = useCallback(
        async (newDescription: string) => {
            if (description !== newDescription) {
                await updateBlockSettings({ description: newDescription });
            }
        },
        [description, updateBlockSettings],
    );

    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new SoftBreakPlugin(), new TextStylePlugin({ textStyles: TextStylePluginsWithoutImage })])
            .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
            .setPlugin([new ResetFormattingPlugin(), new AutoformatPlugin()]);
    }, []);

    const memoTitleRte = useMemo(
        () => (
            <RichTextEditor
                id={`title-${blockId}`}
                value={title ?? convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={saveTitle}
                isEditing={isEditing}
                showSerializedText={hasRichTextValue(title)}
                plugins={customTitlePlugins}
                key={templateTextKey}
            />
        ),
        [blockId, customTitlePlugins, isEditing, saveTitle, title, templateTextKey],
    );

    const memoDescriptionRte = useMemo(
        () => (
            <RichTextEditor
                id={`description-${blockId}`}
                value={description}
                placeholder="Add a description for your template"
                onTextChange={saveDescription}
                showSerializedText={hasRichTextValue(description)}
                isEditing={isEditing}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                key={templateTextKey}
            />
        ),
        [appBridge, blockId, description, isEditing, saveDescription, templateTextKey],
    );

    return (
        <div>
            <div data-test-id="title" className="tw-mb-2">
                {memoTitleRte}
                {pageCount !== undefined && (
                    <div style={{ ...pageCountStyles }} data-test-id="page-count">
                        {`${pageCount} ${pageCountLabel}`}
                    </div>
                )}
            </div>
            <div data-test-id="description">{memoDescriptionRte}</div>
        </div>
    );
};
