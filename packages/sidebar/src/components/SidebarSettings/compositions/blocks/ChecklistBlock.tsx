/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, useCallback, useState } from 'react';
import {
    Button,
    ButtonGroup,
    ButtonSize,
    ButtonStyle,
    CheckboxProps,
    Checklist,
    ChecklistDirection,
    FieldsetHeader,
    FieldsetHeaderSize,
} from '@frontify/arcade';
import { UpdateDataFunction } from '../../hocs/withSettings';
import { Checkbox, ChecklistBlock as ChecklistBlockType } from '../../hooks/useSettings';

export type ChecklistBlockProps = {
    block: ChecklistBlockType;
    onUpdate: UpdateDataFunction<ChecklistBlockType['value']>;
    beforeUpdateData?: (enabledIds: string[]) => string[];
};

export const ChecklistBlock: FC<ChecklistBlockProps> = ({ block, onUpdate }) => {
    const allIds = block.choices.map(({ id }) => id);
    const [enabledIds, setEnabledIds] = useState<string[]>(block.value ?? block.defaultValue);

    const update = (updatedEnabledIds: string[]) => {
        setEnabledIds(updatedEnabledIds);
        onUpdate(block.id, updatedEnabledIds);
    };

    const mapToCheckboxes = useCallback(
        (choice: Checkbox): Omit<CheckboxProps, 'onChange' | 'groupInputProps'> => ({
            label: choice.label,
            value: choice.id,
        }),
        [enabledIds]
    );

    const clearAll = () => update([]);
    const selectAll = () => update(allIds);

    return (
        <>
            <FieldsetHeader bold={true} size={FieldsetHeaderSize.Small}>
                {block.label ?? ''}
            </FieldsetHeader>
            <div className="tw-grid tw-grid-cols-1 tw-pt-2" data-test-id="settings-sidebar-checklist-block">
                <Checklist
                    direction={ChecklistDirection.Vertical}
                    columns={block.columns ?? 1}
                    checkboxes={block.choices.map(mapToCheckboxes)}
                    setActiveValues={update}
                    activeValues={enabledIds}
                />
            </div>
            {block.showClearAndSelectAllButtons && (
                <div className="tw-flex tw-justify-start tw-pt-6" data-test-id="select-all-and-clear">
                    <ButtonGroup size={ButtonSize.Small}>
                        <Button
                            size={ButtonSize.Small}
                            style={ButtonStyle.Secondary}
                            onClick={clearAll}
                            disabled={enabledIds.length === 0}
                        >
                            Clear
                        </Button>
                        <Button
                            size={ButtonSize.Small}
                            style={ButtonStyle.Secondary}
                            onClick={selectAll}
                            disabled={enabledIds.length === allIds.length}
                        >
                            Select All
                        </Button>
                    </ButtonGroup>
                </div>
            )}
        </>
    );
};
