/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSuitcase } from '@frontify/fondue/icons';
import { type ReactElement } from 'react';

type Props = {
    onOpenAssetChooser: () => void;
};

export const FigmaEmptyBlock = ({ onOpenAssetChooser }: Props): ReactElement => {
    return (
        <button
            type="button"
            data-test-id="figma-empty-block"
            className="tw-group tw-w-full tw-py-16 tw-px-4 tw-border-dashed tw-border tw-cursor-pointer tw-text-center tw-border-[color-mix(in_srgb,_var(--f-theme-settings-body-color)_70%,_transparent)] hover:tw-border-[var(--f-theme-settings-body-color)]"
            onClick={onOpenAssetChooser}
        >
            <div className="tw-text-xl tw-mb-4 tw-flex tw-justify-center tw-text-[color-mix(in_srgb,_var(--f-theme-settings-body-color)_70%,_transparent)] group-hover:tw-text-[var(--f-theme-settings-body-color)]">
                <IconSuitcase size={32} />
            </div>
            <span className="tw-text-[color-mix(in_srgb,_var(--f-theme-settings-body-color)_70%,_transparent)] group-hover:tw-text-[var(--f-theme-settings-body-color)]">
                Choose Figma asset
            </span>
        </button>
    );
};
