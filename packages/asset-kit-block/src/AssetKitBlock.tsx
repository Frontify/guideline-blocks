/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { CSSProperties, FC } from 'react';
import 'tailwindcss/tailwind.css';
import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import {
    BorderStyle,
    Padding,
    borderStyleMap,
    paddingStyleMap,
    radiusStyleMap,
    toRgbaString,
    useGuidelineDesignTokens,
} from '@frontify/guideline-blocks-shared';
import { Button, ButtonEmphasis, Color, IconSize, IconTrashBin, RichTextEditor } from '@frontify/fondue';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from './settings';
import {
    GenerateBulkDownloadData,
    GenerateBulkDownloadRequest,
    GenerateBulkDownloadTokenData,
    GenerateBulkDownloadTokenRequest,
} from './types';
import {
    getBulkDownloadStatus,
    postGenerateBulkDownloadRequest,
    postGenerateBulkDownloadToken,
} from './repository/BulkDownloadRepository';

const getBorderStyles = (
    style = BorderStyle.Solid,
    width = '1px',
    color = BORDER_COLOR_DEFAULT_VALUE
): CSSProperties => ({
    borderStyle: borderStyleMap[style],
    borderWidth: width,
    borderColor: toRgbaString(color),
});

const getBackgroundStyles = (backgroundColor: Color): CSSProperties =>
    backgroundColor ? { backgroundColor: toRgbaString(backgroundColor) } : {};

export const AssetKitBlock: FC<BlockProps> = ({ appBridge }) => {
    const { designTokens } = useGuidelineDesignTokens();
    const [blockSettings, setBlockSettings] = useBlockSettings(appBridge);
    const isEditing = useEditorState(appBridge);

    let token = '';

    appBridge.getProjectId(); // project id
    // to get the asset ids refeer to the documentation
    const data: GenerateBulkDownloadTokenRequest = {
        asset_ids: [1, 2, 3],
        set_ids: [],
        language: 'en',
    };

    const generateBulkDownload = () => {
        (async () => {
            const responseToken: GenerateBulkDownloadTokenData = await postGenerateBulkDownloadToken(
                appBridge.getProjectId(),
                data
            );
            token = responseToken.token ?? '';
            console.log(responseToken);

            const dataRequest: GenerateBulkDownloadRequest = {
                token,
            };

            const downloadResponse: GenerateBulkDownloadData = await postGenerateBulkDownloadRequest(dataRequest);
            console.log(downloadResponse);

            const pingReponse: GenerateBulkDownloadData = await getBulkDownloadStatus(downloadResponse.signature);
            console.log(pingReponse);
        })();
    };

    const saveText = (text: string) => {
        text !== blockSettings.text && setBlockSettings({ text });
    };
    const saveTitle = (title: string) => {
        title !== blockSettings.title && setBlockSettings({ title });
    };

    const {
        hasBackground_blocks,
        backgroundColor_blocks = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_blocks,
        borderStyle_blocks,
        borderWidth_blocks,
        borderColor_blocks = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_blocks,
        radiusChoice_blocks,
        radiusValue_blocks,
    } = blockSettings;

    return (
        <div
            style={{
                ...(hasBackground_blocks && getBackgroundStyles(backgroundColor_blocks)),
                ...(hasBorder_blocks && getBorderStyles(borderStyle_blocks, borderWidth_blocks, borderColor_blocks)),
                borderRadius: hasRadius_blocks ? radiusValue_blocks : radiusStyleMap[radiusChoice_blocks],
                padding: paddingStyleMap[Padding.Medium],
            }}
        >
            <h3>
                <RichTextEditor
                    designTokens={designTokens ?? undefined}
                    value={blockSettings.title}
                    readonly={!isEditing}
                    onChange={saveTitle}
                    onBlur={saveTitle}
                    placeholder="Add a title here ..."
                />
            </h3>
            <RichTextEditor
                designTokens={designTokens ?? undefined}
                readonly={!isEditing}
                onTextChange={saveText}
                onBlur={saveText}
                placeholder="Add a description here ..."
                value={blockSettings.text}
            />
            <span className="tw-text-violet-60 tw-underline">Token</span>
            <Button
                icon={<IconTrashBin size={IconSize.Size20} />}
                emphasis={ButtonEmphasis.Default}
                onClick={generateBulkDownload}
            />
        </div>
    );
};
