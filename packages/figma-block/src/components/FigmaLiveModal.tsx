/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dialog } from '@frontify/fondue/components';
import { IconCross } from '@frontify/fondue/icons';
import { type ReactElement } from 'react';

type FigmaLiveModalProps = {
    assetExternalUrl?: string;
    title?: string;
    onClose: () => void;
};

export const FigmaLiveModal = ({ assetExternalUrl, title, onClose }: FigmaLiveModalProps): ReactElement => {
    return (
        <Dialog.Root
            open
            modal
            dismissable
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <Dialog.Content
                data-test-id="figma-full-screen"
                padding="none"
                rounded={false}
                showUnderlay={false}
                maxWidth="100vw"
                minWidth="100vw"
                minHeight="100vh"
            >
                <Dialog.Title screenReaderOnly>{title ?? 'Figma live preview'}</Dialog.Title>

                <div className="tw-fixed tw-flex tw-top-4 tw-right-4 tw-z-50">
                    <Dialog.Close>
                        <Button emphasis="default" aspect="square" aria-label="Close Figma live preview">
                            <IconCross size={16} />
                        </Button>
                    </Dialog.Close>
                </div>

                <div className="tw-relative tw-w-screen tw-h-screen">
                    <iframe
                        src={assetExternalUrl}
                        className="tw-h-full tw-w-full tw-border-none"
                        loading="lazy"
                        title={title ?? 'Figma live preview'}
                        // oxlint-disable-next-line @eslint-react/dom-no-unsafe-iframe-sandbox
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
