/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMarkCircle, IconCrossCircle } from '@frontify/fondue/icons';
import { BlockInjectButton } from '@frontify/guideline-blocks-settings';
import { type FC } from 'react';

import { DoDontType } from '../types';

type AddDoDontButtonsProps = {
    isContainerSmall: boolean;
    onAddItem: (type: DoDontType) => void;
};

export const AddDoDontButtons: FC<AddDoDontButtonsProps> = ({ isContainerSmall, onAddItem }) => (
    <div data-test-id="dos-donts-block-add-buttons" className="tw-flex tw-w-full tw-flex-col @sm:tw-flex-row">
        <BlockInjectButton
            verticalLayout={isContainerSmall}
            label="Add do"
            withMenu={false}
            icon={<IconCheckMarkCircle size={20} />}
            onClick={() => onAddItem(DoDontType.Do)}
        />
        <BlockInjectButton
            verticalLayout={isContainerSmall}
            label="Add don't"
            withMenu={false}
            icon={<IconCrossCircle size={20} />}
            onClick={() => onAddItem(DoDontType.Dont)}
        />
    </div>
);
