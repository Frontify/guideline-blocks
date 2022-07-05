import { FC } from 'react';
import { SettingsContext } from './settingsContext';

const SidebarSettingsGenerator: FC = () => (
    <SettingsContext.Provider value={{ settings: null }}>Block content</SettingsContext.Provider>
);

export default SidebarSettingsGenerator;
