/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Divider } from '@frontify/arcade';
import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';

type Props = {
    appBridge: AppBridgeNative;
};

const DividerBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings(appBridge);

    const blockHeight = blockSettings.isBlockHeightCustom
        ? blockSettings.blockHeightCustom
        : blockSettings.blockHeightSimple;

    return <Divider style={blockSettings.style} height={blockHeight} />;
};

export default DividerBlock;
