/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    BoldPlugin,
    ItalicPlugin,
    PluginComposer,
    ResetFormattingPlugin,
    SoftBreakPlugin,
    StrikethroughPlugin,
    TextStylePlugin,
    TextStyles,
    UnderlinePlugin,
} from '@frontify/fondue';
import {
    RichTextEditor,
    TextStylePluginsWithoutImage,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
} from '@frontify/guideline-blocks-shared';
import { useMemo } from 'react';
import { InformationSectionProps } from '../types';

export const InformationSection = ({
    description,
    isEditing,
    setBlockSettings,
    title,
    appBridge,
}: InformationSectionProps) => {
    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new SoftBreakPlugin(), new TextStylePlugin({ textStyles: TextStylePluginsWithoutImage })])
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
                <RichTextEditor
                    id="block-title"
                    isEditing={isEditing}
                    plugins={customTitlePlugins}
                    onBlur={saveTitle}
                    placeholder="Add a title here ..."
                    showSerializedText={hasRichTextValue(title)}
                    value={title ?? convertToRteValue(TextStyles.heading3)}
                />
            </div>
            <div data-test-id="block-description">
                <RichTextEditor
                    id="block-description"
                    isEditing={isEditing}
                    onBlur={saveDescription}
                    placeholder="Add a description here ..."
                    showSerializedText={hasRichTextValue(description)}
                    value={description}
                    plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                />
            </div>
        </div>
    );
};
