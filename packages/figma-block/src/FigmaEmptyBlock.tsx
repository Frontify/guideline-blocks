/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize, IconSuitcase } from '@frontify/fondue';

import { ReactElement } from 'react';

type Props = {
    onOpenAssetChooser: () => void;
};

export const FigmaEmptyBlock = ({ onOpenAssetChooser }: Props): ReactElement => {
    return (
        <button
            data-test-id="figma-empty-block"
            className="tw-group tw-w-full tw-py-16 tw-px-4 tw-border-dashed tw-border tw-cursor-pointer tw-text-center tw-border-line-x-strong hover:tw-border-[color-mix(in_srgb,_var(--f-theme-settings-body-color)_70%,_transparent)]"
            onClick={onOpenAssetChooser}
        >
            <div className="tw-text-xl tw-mb-4 tw-flex tw-justify-center tw-text-[var(--f-theme-settings-body-color)] group-hover:tw-text-[color-mix(in_srgb,_var(--f-theme-settings-body-color)_70%,_transparent)]">
                <IconSuitcase size={IconSize.Size32} />
            </div>
            <span className="tw-text-text-x-weak group-hover:tw-text-[var(--f-theme-settings-body-color)]">
                Choose Figma asset
            </span>
        </button>
    );
};
