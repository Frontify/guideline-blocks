import { TabItem, Tabs, TabSize } from '@frontify/fondue';
import { FC, useState } from 'react';
import { SettingsCode } from './Components/SettingsCode';
import { SettingsUI } from './Components/SettingsUI';
import { SettingsContext } from './settingsContext';

const SidebarSettingsGenerator: FC = () => {
    const [activeTab, setActiveTab] = useState('ui');
    const [settings, setSettings] = useState({});

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
        <SettingsContext.Provider value={{ settings, setSettings }}>
            <Tabs activeItemId={activeTab} onChange={setActiveTab} size={TabSize.Large}>
                {tabs.map((tab) => (
                    <TabItem {...tab} key={tab.id} />
                ))}
            </Tabs>
        </SettingsContext.Provider>
    );
};

export default SidebarSettingsGenerator;
