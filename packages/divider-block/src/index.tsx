/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { AppBridgeNative } from '@frontify/app-bridge';
// @ts-ignore
import { useBlockSettings } from '@frontify/app-bridge/react';
import { DividerAlignment, dividerAlignment, DividerStyle, dividerStyle } from './types';

type Props = {
    appBridge: AppBridgeNative;
};

const DividerBlock: FC<Props> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings(appBridge);

    const { isWidthCustom, widthCustom, widthSimple, isHeightCustom, heightCustom, heightSimple } = blockSettings;
    const { alignment }: { alignment: DividerAlignment } = blockSettings;
    const { style }: { style: DividerStyle } = blockSettings;
    const borderTopColor = blockSettings.color ? blockSettings.color : '#CCC';

    return (
        <div className={`tw-flex ${dividerAlignment[alignment]}`}>
            <div
                className="tw-flex tw-items-center tw-transition-all"
                style={{
                    width: isWidthCustom ? widthCustom : widthSimple,
                    height: isHeightCustom ? heightCustom : heightSimple,
                }}
            >
                <hr
                    className={`tw-border-t tw-m-0 tw-w-full ${
                        blockSettings['main-dropdown'] === DividerStyle.Solid
                            ? dividerStyle[style]
                            : dividerStyle[DividerStyle.NoLine]
                    }`}
                    style={{ borderTopColor }}
                />
            </div>
        </div>
    );
};

export default DividerBlock;
