/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Block, PathMap, Structure } from './useSettings';
import { ApiBundle, useApiBundle } from './useApiBundle';
import { UpdateDataFunction } from '../hocs/withSettings';

export type ApiCondition = (bundle: ApiBundle) => boolean;
export type Condition = (condition: ApiCondition) => boolean;

export const useCondition = (
    settings: Structure,
    pathMap: PathMap,
    updateData: UpdateDataFunction<Block['value']>
): Condition => {
    const bundle = useApiBundle(settings, pathMap, updateData);

    return (condition: ApiCondition): boolean => condition(bundle);
};
