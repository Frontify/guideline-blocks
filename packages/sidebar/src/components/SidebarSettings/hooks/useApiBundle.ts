/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback } from 'react';
import { get } from 'lodash-es';
import { Block, PathMap, Structure } from './useSettings';
import { UpdateDataFunction } from '../hocs/withSettings';

type ApiField = {
    value?: Block['value'];
};

export type ApiBundle = {
    getBlock: (id: string) => ApiField | null;
    setBlockValue: UpdateDataFunction<Block['value']>;
};

export const useApiBundle = (
    settings: Structure,
    pathMap: PathMap,
    updateData: UpdateDataFunction<Block['value']>
): ApiBundle => {
    const getBlock = useCallback(
        (id: string): ApiField | null => {
            const path = pathMap[id];
            const block = get(settings, path);

            if (!block) {
                console.error(`field with id ${id} does not exist`);
                return null;
            }

            return {
                value: block.value ?? block.defaultValue,
            };
        },
        [settings]
    );
    return {
        getBlock,
        setBlockValue: updateData,
    };
};
