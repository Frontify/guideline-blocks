/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    AlignCenterPlugin,
    AlignJustifyPlugin,
    AlignLeftPlugin,
    AlignRightPlugin,
    BoldPlugin,
    RichTextEditor as FondueRichTextEditor,
    ItalicPlugin,
    OrderedListPlugin,
    PluginComposer,
    TextStylePlugin,
    UnorderedListPlugin,
} from '@frontify/fondue';
import { TextStylePluginsWithoutImage, TextStylesWithoutImage } from '@frontify/guideline-blocks-shared';
import { SerializedText } from '@frontify/guideline-blocks-shared/src/components/RichTextEditor/SerializedText';
import React from 'react';
import { AppBridgeBlock } from '@frontify/app-bridge';

type RichTextProps = {
    appBridge: AppBridgeBlock;
    isEditing: boolean;
    onTextChange: (value: string) => false | Promise<void>;
    content: string | undefined;
    defaultValue: string;
    placeholder: string;
};

export const RichText = ({ isEditing, appBridge, content, onTextChange, defaultValue, placeholder }: RichTextProps) => {
    const plugins = new PluginComposer();
    plugins.setPlugin([
        new TextStylePlugin({
            textStyles: TextStylePluginsWithoutImage,
        }),
        new BoldPlugin(),
        new ItalicPlugin(),
        new AlignLeftPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignCenterPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignRightPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new AlignJustifyPlugin({
            validTypes: TextStylesWithoutImage,
        }),
        new UnorderedListPlugin(),
        new OrderedListPlugin(),
    ]);

    if (isEditing) {
        return (
            <FondueRichTextEditor
                id={appBridge.getBlockId().toString()}
                value={content ?? defaultValue}
                border={false}
                placeholder={placeholder}
                onBlur={onTextChange}
                plugins={plugins}
                onTextChange={onTextChange}
            />
        );
    } else {
        return <SerializedText value={content ?? defaultValue} />;
    }
};
