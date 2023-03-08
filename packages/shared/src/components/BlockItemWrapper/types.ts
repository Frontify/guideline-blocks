/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MenuItemStyle } from '@frontify/fondue';

export type BlockItemWrapperProps = {
    shouldHideWrapper?: boolean;
    shouldHideComponent?: boolean;
    toolbarItems: ToolbarItem[];
    toolbarFlyoutItems: FlyoutToolbarItem[][];
    isDragging?: boolean;
};

export type ToolbarProps = {
    items: ToolbarItem[];
    flyoutItems: FlyoutToolbarItem[][];
    isFlyoutOpen: boolean;
    setIsFlyoutOpen: (isOpen: boolean) => void;
    isDragging?: boolean;
};

type BaseToolbarItem = {
    icon: JSX.Element;
    tooltip: string;
};

type DraghandleToolbarItem = BaseToolbarItem & {
    draggableProps: Record<string, unknown>;
};

type ButtonToolbarItem = BaseToolbarItem & {
    onClick: () => void;
};

type ToolbarItem = DraghandleToolbarItem | ButtonToolbarItem;

type FlyoutToolbarItem = {
    title: string;
    onClick: () => void;
    icon: JSX.Element;
    style?: MenuItemStyle;
};
