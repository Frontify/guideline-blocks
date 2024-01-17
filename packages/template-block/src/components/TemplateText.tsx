/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
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
    title,
    description,
    pageCount,
    isEditing,
    key,
    setTitle,
    setDescription,
}: TemplateTextProps) => {
    const pageCountStyles = BlockStyles[TextStyles.imageCaption];
    const pageCountLabel = pageCount === 1 ? 'page' : 'pages';

    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new SoftBreakPlugin(), new TextStylePlugin({ textStyles: TextStylePluginsWithoutImage })])
            .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
            .setPlugin([new ResetFormattingPlugin(), new AutoformatPlugin()]);
    }, []);

    const memoTitleRte = useMemo(
        () => (
            <RichTextEditor
                id="template-block-title"
                key={key}
                value={title ?? convertToRteValue(TextStyles.heading3)}
                placeholder="Add a title"
                onTextChange={setTitle}
                isEditing={isEditing}
                showSerializedText={hasRichTextValue(title)}
                plugins={customTitlePlugins}
            />
        ),
        [customTitlePlugins, isEditing, setTitle, title],
    );

    const memoDescriptionRte = useMemo(
        () => (
            <RichTextEditor
                id="template-block-description"
                value={description}
                key={key}
                placeholder={
                    'Add a description that will be displayed in the block\n\nNote: When template description is available, it will be added by default'
                }
                onTextChange={setDescription}
                showSerializedText={hasRichTextValue(description)}
                isEditing={isEditing}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        ),
        [appBridge, description, isEditing, setDescription],
    );

    return (
        <div>
            <div className="tw-mb-2">
                {memoTitleRte}
                {pageCount !== undefined && (
                    <div>
                        <span
                            style={{ ...pageCountStyles }}
                            data-test-id="template-block-page-count"
                        >{`${pageCount} ${pageCountLabel}`}</span>
                    </div>
                )}
            </div>
            <div>{memoDescriptionRte}</div>
        </div>
    );
};
