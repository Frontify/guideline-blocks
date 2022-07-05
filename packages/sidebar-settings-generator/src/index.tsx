import { TabItem, TabSize, Tabs } from '@frontify/fondue';
import { useEffect } from 'react';
import { FC, useState } from 'react';
import { SettingsCode } from './Components/SettingsCode';
import { SettingsUI } from './Components/SettingsUI';
import { SettingsContext } from './settingsContext';

declare global {
    interface Window {
        emitter: any;
    }
}

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

    useEffect(() => {
        window.emitter.emit('SetStyleguideSettingsPreview', settings);
    }, [settings]);

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
