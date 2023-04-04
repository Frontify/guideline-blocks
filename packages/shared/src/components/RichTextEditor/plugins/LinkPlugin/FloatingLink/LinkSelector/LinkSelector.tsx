/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType, IconLink, Modal } from '@frontify/fondue';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { ReactElement } from 'react';
import { DocumentLinks } from './DocumentLinks';

type LinkSelectorProps = {
    appBridge: AppBridgeBlock;
    url: string;
    onUrlChange: (value: string) => void;
};

export const LinkSelector = ({ appBridge }: LinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedId] = React.useState<string | null>(null);

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
                        <DocumentLinks appBridge={appBridge} />
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
                                //onUrlChange();
                                closeLinkTree();
                            },
                            style: ButtonStyle.Default,
                            emphasis: ButtonEmphasis.Strong,
                            disabled: !selectedId,
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
