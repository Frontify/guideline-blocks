/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Block, BlockType, SliderBlock, Target } from '../hooks/useSettings';

const TargetTypeId = 'target-type';
const TargetTypeTargeted = 'targeted';
const TargetTypeAll = 'all';

export const getTargetBlocks = (targets: Target[]): Block[] => {
    const hasCheckedTargets = targets.filter((target) => target.checked).length > 0;
    const checkedValues = targets.filter((target) => target.checked).map((target) => target.value.toString());
    const allValues = targets.map((target) => target.value.toString());

    return [
        {
            id: TargetTypeId,
            type: BlockType.Slider,
            defaultValue: TargetTypeAll,
            value: targets.filter((target) => target.checked).length > 0 ? TargetTypeTargeted : TargetTypeAll,
            choices: [
                {
                    label: 'All Viewers',
                    value: TargetTypeAll,
                },
                {
                    label: 'Targeted',
                    value: TargetTypeTargeted,
                },
            ],
        },
        {
            id: 'target-choices',
            type: BlockType.Targets,
            value: hasCheckedTargets ? checkedValues : allValues,
            choices: targets.map(({ label, value, checked }) => ({
                id: value.toString(),
                label,
                enabled: checked,
            })),
            show: (bundle) => (bundle.getBlock(TargetTypeId) as SliderBlock)?.value === TargetTypeTargeted,
            defaultValue: [],
        },
    ];
};
