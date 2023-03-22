/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, ButtonType, IconLink, Modal, Tree } from '@frontify/fondue';
import { useOverlayTriggerState } from '@react-stately/overlays';
import React, { ReactElement } from 'react';

// const TreeLinkItem = ({ node: { id, title, icon } }: TreeLinkItemProps): ReactElement => {
//     const { treeState } = useTreeContext();
//     const isActive = treeState.selectedIds.has(id);

//     return (
//         <div className="tw-flex tw-flex-auto tw-space-x-2">
//             <span className="tw-ml-1">{icon}</span>
//             <span className="tw-text-s">{title}</span>
//             <span
//                 className={merge([
//                     'tw-flex-auto tw-font-sans tw-text-xs tw-text-right',
//                     !isActive && 'tw-text-text-weak',
//                     isActive && 'tw-text-text-white',
//                 ])}
//             >
//                 {title}
//             </span>
//         </div>
//     );
// };

type LinkSelectorProps = {
    url: string;
    onUrlChange: (value: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LinkSelector = ({ url, onUrlChange }: LinkSelectorProps): ReactElement => {
    const { open: openLinkTree, isOpen: isLinkTreeOpen, close: closeLinkTree } = useOverlayTriggerState({});
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [expandedIds] = React.useState<string[]>([]);

    // useEffect(() => {
    //     if (!linkTree) {
    //         loadLinkTree().then((linkTree) => {
    //             setLinkTree(linkTree);
    //             const linkNode = getLinkNodeByProp('url', url, linkTree.nodes ?? []);
    //             setSelectedId(linkNode?.id ?? '');
    //             setExpandedIds(linkNode ? getExpandedIds(linkNode, linkTree) : []);
    //         });
    //     }
    // }, [linkTree, loadLinkTree, url]);

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
            <Modal onClose={() => closeLinkTree()} isOpen={isLinkTreeOpen}>
                <Modal.Header title="Select internal link" />
                <Modal.Body>
                    <div className="link-tree-container">
                        <Tree
                            id="link-tree"
                            selectedIds={selectedId ? [selectedId] : []}
                            onSelect={(id) => (id === selectedId ? setSelectedId(null) : setSelectedId(id))}
                            expandedIds={expandedIds}
                            // onExpand={(id, isExpanded) => {}}
                        >
                            <div>foo</div>
                        </Tree>
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
                            children: 'Confirm',
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
