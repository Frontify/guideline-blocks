/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType, IconLink, Modal } from '@frontify/fondue';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { ReactElement, useState } from 'react';
import { DocumentLinks } from './DocumentLinks';

type LinkSelectorProps = {
    appBridge: AppBridgeBlock;
    url: string;
    onUrlChange: (value: string) => void;
};

export const LinkSelector = ({ appBridge, onUrlChange }: LinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

    const onSelectUrl = (url: string) => {
        setSelectedUrl(url);
    };

    return (
        <>
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
            <Modal onClose={() => closeLinkTree()} isOpen={isLinkTreeOpen} isDismissable>
                <Modal.Header title="Select internal link" />
                <Modal.Body>
                    <div className="link-tree-container">
                        <DocumentLinks appBridge={appBridge} onSelectUrl={onSelectUrl} />
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
                                selectedUrl && onUrlChange(selectedUrl);
                                closeLinkTree();
                            },
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            disabled: !selectedUrl,
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
