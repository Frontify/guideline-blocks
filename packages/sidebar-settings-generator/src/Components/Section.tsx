/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconAddSimple, IconSize } from '@frontify/fondue';
import { SettingBlock } from '@frontify/guideline-blocks-settings';
import { FC } from 'react';
import { Setting } from './Setting';

type Props = {
    blocks: SettingBlock[];
    onInsertSetting: (arrayIndex: number) => void;
};

export const Section: FC<Props> = ({ blocks, onInsertSetting }) => (
    <div data-test-id="settings-sidebar-section">
        {blocks.map((block, index) => (
            <>
                <InsertionIndication onClick={() => onInsertSetting(index)} />
                <Setting key={block.id} block={block} />
                {index === blocks.length - 1 && <InsertionIndication onClick={() => onInsertSetting(index + 1)} />}
            </>
        ))}
    </div>
);

const InsertionIndication = ({ onClick }: { onClick: () => void }) => (
    <div className="tw-items-center tw-flex tw-w-full tw-gap-1">
        <div className="tw-border-t tw-border-dashed tw-border-green-60 tw-relative tw-flex-auto" />
        <button className="tw-bg-green-60 tw-rounded tw-flex-none tw-p-0.5 tw-text-white" onClick={onClick}>
            <IconAddSimple size={IconSize.Size20} />
        </button>
        <div className="tw-border-t tw-border-dashed tw-border-green-60 tw-relative tw-flex-auto" />
    </div>
);
