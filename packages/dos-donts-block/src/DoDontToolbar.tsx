/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconArrowCircleUp,
    IconArrowMove,
    IconArrowSwap,
    IconImageStack,
    IconSpeechBubbleQuote,
    IconTrashBin,
} from '@frontify/fondue/icons';
import { BlockItemWrapper } from '@frontify/guideline-blocks-settings';
import { EditAltTextFlyout } from '@frontify/guideline-blocks-shared';
import { type ReactNode, useEffect, useState } from 'react';

import { type DoDontItemProps, DoDontType } from './types';

type DoDontItemWrapperProps = Pick<
    DoDontItemProps,
    'id' | 'type' | 'editing' | 'linkedImage' | 'alt' | 'onChangeItem' | 'onRemoveSelf' | 'setActivatorNodeRef'
> & {
    draggableProps: Record<string, unknown>;
    children: ReactNode;
    isDragging: boolean;
    replaceWithPlaceholder: boolean;
    pendingAltText: string | undefined;
    onUploadClick: () => void;
    onOpenAssetChooser: () => void;
};

export const DoDontItemWrapper = ({
    id,
    type,
    editing,
    linkedImage,
    alt,
    onChangeItem,
    onRemoveSelf,
    setActivatorNodeRef,
    children,
    isDragging,
    replaceWithPlaceholder,
    draggableProps,
    pendingAltText,
    onUploadClick,
    onOpenAssetChooser,
}: DoDontItemWrapperProps) => {
    const [showAltTextMenu, setShowAltTextMenu] = useState(false);
    const [localAltText, setLocalAltText] = useState<string | undefined>(alt);

    useEffect(() => {
        if (pendingAltText !== undefined) {
            setLocalAltText(pendingAltText);
        }
    }, [pendingAltText]);

    return (
        <BlockItemWrapper
            isDragging={isDragging}
            shouldHideWrapper={replaceWithPlaceholder || !editing}
            shouldHideComponent={replaceWithPlaceholder}
            shouldBeShown={isDragging}
            toolbarItems={[
                {
                    type: 'dragHandle',
                    icon: <IconArrowMove size={16} />,
                    draggableProps,
                    setActivatorNodeRef,
                },
                {
                    type: 'button',
                    icon: <IconTrashBin size={16} />,
                    tooltip: 'Delete Item',
                    onClick: () => onRemoveSelf(id),
                },
                {
                    type: 'menu',
                    items: [
                        [
                            ...(linkedImage
                                ? [
                                      {
                                          title: 'Replace with upload',
                                          icon: <IconArrowCircleUp size={20} />,
                                          onClick: onUploadClick,
                                      },
                                      {
                                          title: 'Replace with asset',
                                          icon: <IconImageStack size={20} />,
                                          onClick: onOpenAssetChooser,
                                      },
                                  ]
                                : []),
                            {
                                title: type === DoDontType.Do ? 'Change to "don\'t"' : 'Change to "do"',
                                icon: <IconArrowSwap size={20} />,
                                onClick: () =>
                                    onChangeItem(id, {
                                        type: type === DoDontType.Do ? DoDontType.Dont : DoDontType.Do,
                                    }),
                            },
                            {
                                title: 'Set alt text',
                                onClick: () => setShowAltTextMenu(true),
                                icon: <IconSpeechBubbleQuote size={20} />,
                            },
                        ],
                        [
                            {
                                title: 'Delete',
                                icon: <IconTrashBin size={20} />,
                                onClick: () => onRemoveSelf(id),
                            },
                        ],
                    ],
                },
            ]}
        >
            <EditAltTextFlyout
                setShowAltTextMenu={setShowAltTextMenu}
                showAltTextMenu={showAltTextMenu}
                setLocalAltText={setLocalAltText}
                defaultAltText={alt}
                onSave={() => onChangeItem(id, { alt: localAltText })}
                localAltText={localAltText}
            />
            {children}
        </BlockItemWrapper>
    );
};
