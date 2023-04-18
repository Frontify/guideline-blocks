/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from "@frontify/guideline-blocks-settings";
import type { FC } from "react";
import { useBlockSettings, useEditorState } from "@frontify/app-bridge";
import { useGuidelineDesignTokens } from "@frontify/guideline-blocks-shared";
import {
    ParagraphPlugin,
    parseRawValue,
    PluginComposer,
    Position,
    RichTextEditor,
    serializeRawToHtml,
    SoftBreakPlugin,
    TextStylePlugin,
} from "@frontify/fondue";
import { Settings } from "../../types";

export const ModalHeadline: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const onTextChange = (value: string) =>
        value !== blockSettings.modalcontent &&
        setBlockSettings({ modalcontent: value });
    const rawValue = JSON.stringify(
        parseRawValue({ raw: blockSettings.modalcontent ?? "" })
    );
    const html = serializeRawToHtml(
        rawValue,
        designTokens,
        blockSettings.columnNumber,
        "normal"
    );

    const plugins = new PluginComposer({ noToolbar: true });
    plugins.setPlugin([
        new SoftBreakPlugin(),
        new ParagraphPlugin(),
        new TextStylePlugin(),
    ]);

    return (
        <>
            {!isEditing ? (
                <div
                    data-test-id="headline-content-html"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            ) : (
                <RichTextEditor
                    id={appBridge.getBlockId().toString()}
                    designTokens={designTokens}
                    value={blockSettings.modalcontent}
                    border={false}
                    placeholder={"note / description"}
                    onTextChange={onTextChange}
                    onBlur={onTextChange}
                    plugins={plugins}
                    position={Position.BOTTOM}
                />
            )}
        </>
    );
};
