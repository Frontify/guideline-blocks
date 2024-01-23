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
import { useTemplateBlockData } from '../hooks/useTemplateBlockData';

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
    const { hasTitleOnly } = useTemplateBlockData(appBridge);

    const blockId = appBridge.context('blockId').get();
    const pageCountStyles = BlockStyles[TextStyles.imageCaption];
    const pageCountLabel = pageCount === 1 ? 'page' : 'pages';

    const { titleWrapperClasses, titleClasses } = useMemo(() => {
        const removeTopMargin = '[&>div>*:first-child]:!tw-mt-0';
        const removeBottomMargin = '[&>div>*:last-child]:!tw-mb-0';

        return hasTitleOnly
            ? {
                  titleWrapperClasses: '',
                  titleClasses: `${removeTopMargin} ${removeBottomMargin}`,
              }
            : {
                  titleWrapperClasses: 'tw-mb-2',
                  titleClasses: removeTopMargin,
              };
    }, [hasTitleOnly]);

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
                onTextChange={setTitle}
                isEditing={isEditing}
                showSerializedText={hasRichTextValue(title)}
                plugins={customTitlePlugins}
            />
        ),
        [blockId, customTitlePlugins, isEditing, key, setTitle, title],
    );

    const memoDescriptionRte = useMemo(
        () => (
            <RichTextEditor
                id={`description-${blockId}`}
                value={description}
                key={key}
                placeholder="Add a description for your template"
                onTextChange={setDescription}
                showSerializedText={hasRichTextValue(description)}
                isEditing={isEditing}
                plugins={getDefaultPluginsWithLinkChooser(appBridge)}
            />
        ),
        [appBridge, blockId, description, isEditing, key, setDescription],
    );

    return (
        <div>
            <div className={titleWrapperClasses}>
                <div data-test-id="title" className={titleClasses}>
                    {memoTitleRte}
                </div>
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
