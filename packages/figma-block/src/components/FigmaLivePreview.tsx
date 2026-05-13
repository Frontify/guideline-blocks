/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue/components';
import { IconArrowExpand } from '@frontify/fondue/icons';
import { type Color } from '@frontify/guideline-blocks-settings';
import { type ReactElement } from 'react';

import { getBorderOfBlock, getHeightOfBlock } from '../helpers';

type FigmaLivePreviewProps = {
    assetExternalUrl: string;
    allowFullScreen?: boolean;
    isMobile: boolean;
    onOpenFullScreen: () => void;
    hasBorder: boolean;
    borderStyle: string;
    borderWidth: string;
    borderColor: Color;
    height: string;
};

export const FigmaLivePreview = ({
    assetExternalUrl,
    onOpenFullScreen,
    hasBorder,
    borderStyle,
    borderWidth,
    borderColor,
    height,
    isMobile,
    allowFullScreen,
}: FigmaLivePreviewProps): ReactElement => (
    <div
        data-test-id="figma-live-preview"
        style={{
            border: getBorderOfBlock(hasBorder, borderStyle, borderWidth, borderColor),
            height: getHeightOfBlock(height, isMobile),
        }}
        className="tw-relative tw-flex tw-justify-center tw-group"
    >
        {allowFullScreen && (
            <div className="tw-absolute tw-top-4 tw-right-4 tw-opacity-0 tw-transition-opacity group-hover:tw-opacity-100">
                <Button onPress={onOpenFullScreen} emphasis="default" aria-label="allow fullscreen" aspect="square">
                    <IconArrowExpand size={16} />
                </Button>
            </div>
        )}

        <iframe
            src={assetExternalUrl}
            className="tw-h-full tw-w-full tw-border-none"
            title="figma-iframe"
            // eslint-disable-next-line @eslint-react/dom-no-unsafe-iframe-sandbox
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
    </div>
);
