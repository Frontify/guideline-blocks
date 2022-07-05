import { TabItem, TabSize, Tabs } from '@frontify/fondue';
import { useState } from 'react';
import { FC } from 'react';
import { SettingsCode } from './Components/SettingsCode';
import { SettingsUI } from './Components/SettingsUI';
import { SettingsContext } from './settingsContext';

const SidebarSettingsGenerator: FC = () => {
    const [activeTab, setActiveTab] = useState('ui');

    const tabs = [
        {
            id: 'ui',
            label: 'UI',
            children: <SettingsUI />,
        },
        {
            id: 'code',
            label: 'Code',
            children: <SettingsCode />,
        },
    ];

    return (
        <SettingsContext.Provider value={{ settings: null }}>
            <Tabs activeItemId={activeTab} onChange={setActiveTab} size={TabSize.Large}>
                {tabs.map((tab) => (
                    <TabItem {...tab} key={tab.id} />
                ))}
            </Tabs>
        </SettingsContext.Provider>
    );
};

export default SidebarSettingsGenerator;
