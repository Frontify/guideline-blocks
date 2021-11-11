/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ApiBundle, useApiBundle } from './useApiBundle';
import { Structure, PathMap, Block } from './useSettings';
import { UpdateDataFunction } from '../hocs/withSettings';

export type ApiOnChange = (bundle: ApiBundle) => void;
export type OnChange = (onChange: ApiOnChange) => void;

export const useOnChange = (
    settings: Structure,
    pathMap: PathMap,
    updateData: UpdateDataFunction<Block['value']>
): OnChange => {
    const bundle = useApiBundle(settings, pathMap, updateData);

    return (onChange: ApiOnChange): void => onChange(bundle);
};
