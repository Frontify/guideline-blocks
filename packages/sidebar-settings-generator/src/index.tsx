import { TabItem, TabSize, Tabs } from '@frontify/fondue';
import { useState } from 'react';
import { FC } from 'react';
import { EmptySection } from './Components/EmptySection';
import { SettingsModal } from './Components/SettingsModal';
import { SettingsCode } from './Components/SettingsCode';
import { SettingsUI } from './Components/SettingsUI';
import { SettingsContext } from './settingsContext';

const SidebarSettingsGenerator: FC = () => {
    const [activeTab, setActiveTab] = useState('ui');
    const [showSettings, setShowSettings] = useState(false);
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
            <EmptySection onClick={() => setShowSettings(!showSettings)} text="Add a setting" />
            <SettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
        </SettingsContext.Provider>
    );
};

export default SidebarSettingsGenerator;
