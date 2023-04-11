/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType, IconLink, Modal } from '@frontify/fondue';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { ReactElement, useEffect, useState } from 'react';
import { DocumentLinks } from './DocumentLinks';

type LinkSelectorProps = {
    appBridge: AppBridgeBlock;
    url: string;
    onUrlChange: (value: string) => void;
};

export const LinkSelector = ({ appBridge, url, onUrlChange }: LinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedUrl, setSelectedUrl] = useState<string>(url);

    const onSelectUrl = (url: string) => {
        setSelectedUrl(url);
    };

    useEffect(() => {
        if (url && !selectedUrl) {
            setSelectedUrl(url);
        }
    }, [url, selectedUrl]);

    return (
        <div data-test-id="internal-link-selector">
            <Button
                icon={<IconLink />}
                size={ButtonSize.Medium}
                type={ButtonType.Button}
                style={ButtonStyle.Default}
                emphasis={ButtonEmphasis.Default}
                onClick={() => openLinkTree()}
            >
                Internal link
            </Button>
            <Modal zIndex={200} onClose={() => closeLinkTree()} isOpen={isLinkTreeOpen} isDismissable>
                <div data-test-id="internal-link-selector-modal" className="link-tree-container tw-space-y-6">
                    <Modal.Header title="Select internal link" />
                    <Modal.Body>
                        <div>
                            <DocumentLinks appBridge={appBridge} selectedUrl={selectedUrl} onSelectUrl={onSelectUrl} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        buttons={[
                            {
                                children: 'Cancel',
                                onClick: () => closeLinkTree(),
                                style: ButtonStyle.Default,
                                emphasis: ButtonEmphasis.Default,
                            },
                            {
                                children: 'Choose',
                                onClick: (event) => {
                                    event?.preventDefault();
                                    onUrlChange(selectedUrl);
                                    closeLinkTree();
                                },
                                style: ButtonStyle.Default,
                                emphasis: ButtonEmphasis.Strong,
                                disabled: !selectedUrl,
                            },
                        ]}
                    />
                </div>
            </Modal>
        </div>
    );
};