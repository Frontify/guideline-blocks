/* (c) Copyright Frontify Ltd., all rights reserved. */

export type BlockInjectButtonProps = {
    isLoading?: boolean;
    label: string;
    secondaryLabel?: string;
    icon?: JSX.Element;
    onDrop?: (files: FileList) => void;
    fillParentContainer?: boolean;
    onUploadClick?: () => void;
    onAssetChooseClick?: () => void;
    withMenu?: boolean;
    onClick?: () => void;
};
