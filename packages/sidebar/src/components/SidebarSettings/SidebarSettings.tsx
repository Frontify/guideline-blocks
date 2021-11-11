/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import '@frontify/arcade/style';
import { Breadcrumb } from '@frontify/arcade';
import { Sidebar } from './compositions/Sidebar';
import { SettingsStructure, withSettings } from './hocs/withSettings';
import { Block, Data, SectionIds, Target } from './hooks/useSettings';

export type SidebarSettingsProps = {
    breadcrumbs: Breadcrumb[];
    onClosed: () => void;
    onValueChanged: (key: string, value: Block['value'], sectionId: SectionIds) => void;
    settings: Data;
    settingsStructure: SettingsStructure;
    targets: Target[];
    targetsEnabled: boolean;
};

export const SidebarSettings: FC<SidebarSettingsProps> = ({
    breadcrumbs = [],
    onClosed,
    onValueChanged,
    settings,
    settingsStructure,
    targets,
    targetsEnabled,
}) => {
    const SidebarWithSettings = withSettings(
        settingsStructure,
        settings,
        targetsEnabled,
        targets,
        onValueChanged,
        onClosed
    )(Sidebar);

    return (
        <div className="tw-w-80 tw-bg-white" data-test-id="settings-sidebar">
            <SidebarWithSettings breadcrumbs={breadcrumbs ?? []} />
        </div>
    );
};
