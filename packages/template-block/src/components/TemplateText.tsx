/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';
import {
    BlockStyles,
    RichTextEditor,
    TextStylePluginsWithoutImage,
    TextStyles,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
} from '@frontify/guideline-blocks-settings';
import { AppBridgeBlock } from '@frontify/app-bridge';
import { Settings } from '../types';
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

export type TemplateTextProps = {
    appBridge: AppBridgeBlock;
    blockSettings: Settings;
    title: string;
    description: string;
    pageCount: number | undefined;
    isEditing: boolean;
    setTitle: (newTitle: string) => void;
    setDescription: (newDescription: string) => void;
};

export const TemplateText = ({
    appBridge,
    title,
    description,
    pageCount,
    isEditing,
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

    const memoTitleRte = (
        <RichTextEditor
            id="template-block-title"
            value={title ?? convertToRteValue(TextStyles.heading3)}
            placeholder="Add a title"
            onTextChange={setTitle}
            isEditing={isEditing}
            plugins={customTitlePlugins}
        />
    );

    const memoDescriptionRte = (
        <RichTextEditor
            id="template-block-description"
            value={description}
            placeholder={
                'Add a description that will be displayed in the block\n\nNote: When template description is available, it will be added by default'
            }
            onTextChange={setDescription}
            isEditing={isEditing}
            plugins={getDefaultPluginsWithLinkChooser(appBridge)}
        />
    );

    return (
        <div>
            <div className="tw-mb-2">
                {memoTitleRte}
                <div>
                    <span data-test-id="template-block-page-count" style={{ ...pageCountStyles }}>
                        {`${pageCount} ${pageCountLabel}`}
                    </span>
                </div>
            </div>
            <div>{memoDescriptionRte}</div>
        </div>
    );
};
