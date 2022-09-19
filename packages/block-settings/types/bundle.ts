/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { SettingBlock } from './blocks';

export type SettingValue = {
    value?: SettingBlock['value'];
};

export type Bundle = {
    getBlock: (id: string) => SettingValue | null;
    getAppBridge: () => AppBridgeBlock;
    setBlockValue: (key: string, value: SettingBlock['value']) => void;
};
