/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';
import { SidebarSettingsGeneratorContext } from './types';

export const SettingsContext = createContext<SidebarSettingsGeneratorContext>({
    settings: null,
});
