import React from 'react';
import { DefaultValues, Settings } from './types';

export const SettingsContext = React.createContext<Settings>(DefaultValues);
