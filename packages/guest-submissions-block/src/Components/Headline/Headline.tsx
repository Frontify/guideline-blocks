/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockProps } from "@frontify/guideline-blocks-settings";
import type { FC } from "react";
import { useBlockSettings, useEditorState } from "@frontify/app-bridge";
import { useGuidelineDesignTokens } from "@frontify/guideline-blocks-shared";
import {
    parseRawValue,
    RichTextEditor,
    serializeRawToHtml,
} from "@frontify/fondue";
import { PLACEHOLDER } from "./constant";
import { Settings } from "../../types";
import { getPlugins } from "./getPlugins";

const DEFAULT_VALUE =
    '[{"type":"heading1","children":[{"text":"Headline","textStyle":"heading1"}]},{"type":"p","children":[{"text":"Subheadline for the Submission.","textStyle":"p"}]}]';

export const Headline: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const onTextChange = (value: string) =>
        value !== blockSettings.content && setBlockSettings({ content: value });

    const rawValue = JSON.stringify(
        parseRawValue({ raw: blockSettings.content ?? DEFAULT_VALUE })
    );
    const html = serializeRawToHtml(
        rawValue,
        designTokens,
        blockSettings.columnNumber,
        "normal"
    );

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
                    value={blockSettings.content ?? DEFAULT_VALUE}
                    border={false}
                    placeholder={PLACEHOLDER}
                    onTextChange={onTextChange}
                    onBlur={onTextChange}
                    plugins={getPlugins(blockSettings.columnNumber, "normal")}
                />
            )}
        </>
    );
};
