/* (c) Copyright Frontify Ltd., all rights reserved. */

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
} from '@frontify/fondue/rte';
import {
    RichTextEditor,
    TextStylePluginsWithoutImage,
    TextStyles,
    convertToRteValue,
    getDefaultPluginsWithLinkChooser,
    hasRichTextValue,
} from '@frontify/guideline-blocks-settings';
import { useMemo } from 'react';

import { type InformationSectionProps } from '../types';

export const InformationSection = ({
    description,
    isEditing,
    setBlockSettings,
    title,
    appBridge,
}: InformationSectionProps) => {
    // eslint-disable-next-line @eslint-react/no-unnecessary-use-memo
    const customTitlePlugins = useMemo(() => {
        return new PluginComposer()
            .setPlugin([new SoftBreakPlugin(), new TextStylePlugin({ textStyles: TextStylePluginsWithoutImage })])
            .setPlugin([new BoldPlugin(), new ItalicPlugin(), new UnderlinePlugin(), new StrikethroughPlugin()])
            .setPlugin([new ResetFormattingPlugin(), new AutoformatPlugin()]);
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
                    id={`block-title-${appBridge.context('blockId').get()}`}
                    isEditing={isEditing}
                    plugins={customTitlePlugins}
                    onTextChange={saveTitle}
                    placeholder="Add a title here ..."
                    showSerializedText={hasRichTextValue(title)}
                    value={title ?? convertToRteValue(TextStyles.heading3)}
                />
            </div>
            <div data-test-id="block-description">
                <RichTextEditor
                    id={`block-description-${appBridge.context('blockId').get()}`}
                    isEditing={isEditing}
                    onTextChange={saveDescription}
                    placeholder="Add a description here ..."
                    showSerializedText={hasRichTextValue(description)}
                    value={description}
                    plugins={getDefaultPluginsWithLinkChooser(appBridge)}
                />
            </div>
        </div>
    );
};
