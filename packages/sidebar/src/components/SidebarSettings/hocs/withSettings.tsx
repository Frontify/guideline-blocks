/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { createContext, FC } from 'react';
import { toPath } from 'lodash-es';
import { getTargetBlocks } from '../helpers/targets';
import {
    AssetInputBlock,
    Block,
    ChecklistBlock,
    Data,
    DropdownBlock,
    InputBlock,
    MultiInputBlock,
    PathMap,
    SectionIds,
    SliderBlock,
    Structure,
    SwitchBlock,
    Target,
    useSettings,
} from '../hooks/useSettings';

type ApiBlock =
    | AssetInputBlock
    | SwitchBlock
    | DropdownBlock
    | SliderBlock
    | InputBlock
    | MultiInputBlock
    | ChecklistBlock;

export type SettingsStructure = {
    [SectionIds.Main]?: ApiBlock[];
    [SectionIds.Content]?: ApiBlock[];
    [SectionIds.Layout]?: ApiBlock[];
    [SectionIds.Style]?: ApiBlock[];
    [SectionIds.Security]?: ApiBlock[];
};

export type UpdateDataFunction<T> = (key: string, value: T) => void;

export type AppliedSettings = {
    settings: Structure;
    pathMap: PathMap;
    updateData: UpdateDataFunction<Block['value']>;
    onClosed: () => void;
};

const initialSettings: Structure = {
    [SectionIds.Main]: [],
    [SectionIds.Content]: [],
    [SectionIds.Layout]: [],
    [SectionIds.Style]: [],
    [SectionIds.Security]: [],
    [SectionIds.Targets]: [],
};

export const SettingsContext: React.Context<AppliedSettings> = createContext<AppliedSettings>({
    settings: initialSettings,
    pathMap: {},
    updateData: () => console.warn('no data handler defined'),
    onClosed: () => console.warn('no onClosed handler defined'),
});

export const withSettings = (
    apiStructure: SettingsStructure,
    data: Data,
    targetsEnabled: boolean,
    targets: Target[],
    onValueChanged: (key: string, value: Block['value'], sectionId: SectionIds) => void,
    onClosed: () => void
) => {
    return function <P>(WrappedComponent: FC<P>) {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        return function withSettingsProvider(props: P) {
            const targetStructure: Structure = targetsEnabled ? { [SectionIds.Targets]: getTargetBlocks(targets) } : {};
            const structure: Structure = {
                ...initialSettings,
                ...apiStructure,
                ...targetStructure,
            };

            const [settings, pathMap, updateData] = useSettings(structure, data);

            return (
                <SettingsContext.Provider
                    value={{
                        settings,
                        pathMap,
                        onClosed,
                        updateData: (key, value) => {
                            updateData(key, value);
                            onValueChanged(key, value, toPath(pathMap[key])[0] as SectionIds);
                        },
                    }}
                >
                    <WrappedComponent {...props} />
                </SettingsContext.Provider>
            );
        };
    };
};
