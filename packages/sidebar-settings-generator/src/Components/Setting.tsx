/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button } from '@frontify/fondue';
import { SettingBlock } from '@frontify/guideline-blocks-settings';

export const Setting = ({ block }: { block: SettingBlock }) => {
    const onEdit = () => {};

    const onDelete = () => {};

    return (
        <>
            <div className="tw-px-10 tw-py-4">
                <div className="tw-border-2 tw-border-solid tw-border-line tw-p-4">
                    <div className="tw-text-xl tw-font-bold">Setting: {block.type}</div>
                    <div className="tw-text-xs">ID: {block.id}</div>
                    <div className="tw-flex tw-mt-3">
                        <div className="tw-pr-4">
                            <Button onClick={onEdit}>Edit</Button>
                        </div>
                        <div>
                            <Button onClick={onDelete}>Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
