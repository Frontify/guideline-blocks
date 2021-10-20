/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { Divider } from '@frontify/arcade';
import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';

type Props = {
    appBridge: AppBridgeNative;
};

const DividerBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings(appBridge);

    return <Divider style={blockSettings.style} height={blockSettings.height} />;
};

export default DividerBlock;
