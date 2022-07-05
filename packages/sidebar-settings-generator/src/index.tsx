import { TabItem, TabSize, Tabs, Button } from '@frontify/fondue';
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

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            <Tabs activeItemId={activeTab} onChange={setActiveTab} size={TabSize.Large}>
                {[
                    {
                        id: 'ui',
                        label: 'UI',
                        children: <SettingsUI />,
                    },
                    {
                        id: 'code',
                        label: 'Code',
                        children: <SettingsCode settings={settings} />,
                    },
                ].map((tab) => (
                    <TabItem {...tab} key={tab.id} />
                ))}
            </Tabs>
            <Button onClick={() => window.emitter.emit('SetStyleguideSettingsPreview', settings)}>
                Open Sidebar Preview
            </Button>
        </SettingsContext.Provider>
    );
};

export default SidebarSettingsGenerator;
