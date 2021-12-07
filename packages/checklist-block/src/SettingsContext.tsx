/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';
import { DefaultValues, Settings } from './types';

export const SettingsContext = createContext<Settings>(DefaultValues);
