/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { Divider } from '@frontify/arcade';
import { AppBridgeNative } from '@frontify/app-bridge';
// @ts-ignore
import { useBlockSettings } from '@frontify/app-bridge/react';
import { DividerAlignment, dividerAlignment } from './types';

type Props = {
    appBridge: AppBridgeNative;
};

const DividerBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings(appBridge);

    const { isWidthCustom, widthCustom, widthSimple } = blockSettings;
    const { isBlockHeightCustom, blockHeightCustom, blockHeightSimple } = blockSettings;

    const { alignment }: { alignment: DividerAlignment } = blockSettings;

    return (
        <div className={`tw-flex ${dividerAlignment[alignment]}`}>
            <div
                className="tw-transition-all"
                style={{
                    width: isWidthCustom ? widthCustom : widthSimple,
                }}
            >
                <Divider
                    style={blockSettings.style}
                    height={isBlockHeightCustom ? blockHeightCustom : blockHeightSimple}
                />
            </div>
        </div>
    );
};

export default DividerBlock;
