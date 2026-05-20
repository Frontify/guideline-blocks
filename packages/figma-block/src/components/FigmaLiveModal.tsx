/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue/components';
import { IconCross } from '@frontify/fondue/icons';
import { type ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FIGMA_BLOCK_MODAL_CLASSES = 'tw-overflow-y-hidden';

type FigmaLiveModalProps = {
    assetExternalUrl?: string;
    title?: string;
    onClose: () => void;
};

export const FigmaLiveModal = ({ assetExternalUrl, title, onClose }: FigmaLiveModalProps): ReactElement => {
    useEffect(() => {
        document.body.classList.add(FIGMA_BLOCK_MODAL_CLASSES);

        return () => {
            document.body.classList.remove(FIGMA_BLOCK_MODAL_CLASSES);
        };
    }, []);

    return createPortal(
        <div
            data-test-id="figma-full-screen"
            className="tw-animate-fade-in-forwards tw-fixed tw-flex tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-50"
        >
            <div className="tw-fixed tw-flex tw-top-4 tw-right-4 tw-z-50">
                <Button onPress={onClose} emphasis="default" aspect="square" aria-label="close">
                    <IconCross size={16} />
                </Button>
            </div>

            <div className="tw-relative tw-w-full tw-h-full">
                <iframe
                    src={assetExternalUrl}
                    className="tw-h-full tw-w-full tw-border-none"
                    loading="lazy"
                    title={title}
                    // eslint-disable-next-line @eslint-react/dom-no-unsafe-iframe-sandbox
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
            </div>
        </div>,
        document.body
    );
};
