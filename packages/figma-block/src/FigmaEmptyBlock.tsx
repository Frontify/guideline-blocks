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
            className="tw-group tw-w-full tw-py-16 tw-px-4 tw-border-dashed tw-border tw-cursor-pointer tw-text-center tw-border-line-x-strong hover:tw-border-black"
            onClick={onOpenAssetChooser}
        >
            <div className="tw-text-xl tw-mb-4 tw-flex tw-justify-center tw-text-black-40 group-hover:tw-text-violet-60">
                <IconSuitcase size={IconSize.Size32} />
            </div>
            <span className="tw-text-text-x-weak group-hover:tw-text-black">Choose Figma asset</span>
        </button>
    );
};
