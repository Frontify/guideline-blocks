import { useBlockSettings, useEditorState } from "@frontify/app-bridge";
import { Settings } from "../../types";
import { useGuidelineDesignTokens } from "@frontify/guideline-blocks-shared";
import {
    Checkbox,
    CheckboxState,
    parseRawValue,
    RichTextEditor,
    serializeRawToHtml,
    Text,
} from "@frontify/fondue";
import { PLACEHOLDER } from "../Headline/constant";
import { getPlugins } from "../Headline/getPlugins";
import React, { FC, useState } from "react";
import { BlockProps } from "@frontify/guideline-blocks-settings";

const DEFAULT_VALUE: string =
    '[{"type":"p","children":[{"text":"By continuing, I agree that I will not upload malware, unlawful materials or content that violates the intellectual property rights of others.","textStyle":"p"}]}]';
export const Disclaimer: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);
    const { designTokens } = useGuidelineDesignTokens();

    const onTextChange = (value: string) =>
        value !== blockSettings.disclaimerText &&
        setBlockSettings({ disclaimerText: value });

    const rawValue = JSON.stringify(
        parseRawValue({ raw: blockSettings.disclaimerText ?? DEFAULT_VALUE })
    );
    const html = serializeRawToHtml(
        rawValue,
        designTokens,
        blockSettings.columnNumber,
        "normal"
    );

    const [checked, setChecked] = useState<CheckboxState>(
        CheckboxState.Unchecked
    );

    return (
        <>
            <Text weight="strong" color="weak">
                Disclaimer
            </Text>
            <div className="tw-flex">
                <Checkbox
                    onChange={() =>
                        checked === CheckboxState.Checked
                            ? setChecked(CheckboxState.Unchecked)
                            : setChecked(CheckboxState.Checked)
                    }
                    id="disclaimer"
                    state={checked}
                    value="disclaimer"
                />
                {!isEditing ? (
                    <label
                        htmlFor={"disclaimer"}
                        data-test-id="disclaimer-html"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <RichTextEditor
                        id={appBridge.getBlockId().toString()}
                        designTokens={designTokens}
                        value={blockSettings.disclaimerText ?? DEFAULT_VALUE}
                        border={false}
                        placeholder={PLACEHOLDER}
                        onTextChange={onTextChange}
                        onBlur={onTextChange}
                        plugins={getPlugins(
                            blockSettings.columnNumber,
                            "normal"
                        )}
                    />
                )}
            </div>
        </>
    );
};
