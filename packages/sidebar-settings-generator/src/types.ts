import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { Dispatch, SetStateAction } from 'react';

export type SidebarSettingsGeneratorContext = {
    settings: BlockSettings | null;
    setSettings: Dispatch<SetStateAction<BlockSettings>>;
};
