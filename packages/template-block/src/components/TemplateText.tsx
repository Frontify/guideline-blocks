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
import { useTemplateBlockData } from '../hooks/useTemplateBlockData';

export const TemplateText = ({
    appBridge,
    updateBlockSettings,
    title,
    description,
    pageCount,
    isEditing,
    key,
}: TemplateTextProps) => {
    const { hasTitleOnly } = useTemplateBlockData(appBridge);

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
                key={key}
                value={title ?? convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={saveDescription}
                isEditing={isEditing}
                showSerializedText={hasRichTextValue(title)}
                plugins={customTitlePlugins}
            />
        ),
        [blockId, customTitlePlugins, isEditing, key, saveDescription, title],
    );

    const memoDescriptionRte = useMemo(
        () => (
            <RichTextEditor
                id={`description-${blockId}`}
                value={description}
                key={key}
                placeholder="Add a description for your template"
                onTextChange={saveTitle}
                showSerializedText={hasRichTextValue(description)}
                isEditing={isEditing}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        ),
        [appBridge, blockId, description, isEditing, key, saveTitle],
    );

    const titleClasses = useMemo(() => {
        const removeTopMargin =
            '[&>div>*:first-child]:!tw-mt-0 [&>div>[data-slate-editor="true"]>*:first-child]:!tw-mt-0';
        const removeBottomMargin =
            '[&>div>*:last-child]:!tw-mb-0 [&>div>[data-slate-editor="true"]>*:last-child]:!tw-mb-0';

        return hasTitleOnly ? `${removeTopMargin} ${removeBottomMargin}` : `${removeTopMargin} tw-mb-2`;
    }, [hasTitleOnly]);

    return (
        <div>
            <div data-test-id="title" className={titleClasses}>
                {memoTitleRte}
            </div>

            {pageCount !== undefined && (
                <div style={{ ...pageCountStyles }} data-test-id="page-count">
                    {`${pageCount} ${pageCountLabel}`}
                </div>
            )}

            <div className={isEditing || hasRichTextValue(description) ? 'tw-mt-2' : ''} data-test-id="description">
                {memoDescriptionRte}
            </div>
        </div>
    );
};
