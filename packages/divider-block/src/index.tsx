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

    const {
        isLine,
        color,
        isWidthCustom,
        widthCustom,
        widthSimple,
        isHeightCustom,
        heightCustom,
        heightSimple,
        isThicknessCustom,
        thicknessCustom,
        thicknessSimple,
    } = blockSettings;

    const { alignment }: { alignment: DividerAlignment } = blockSettings;
    const { style }: { style: DividerStyle } = blockSettings;

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
                        isLine === DividerStyle.Solid ? dividerStyle[style] : dividerStyle[DividerStyle.NoLine]
                    }`}
                    style={{
                        borderTopWidth: isThicknessCustom ? thicknessCustom : thicknessSimple,
                        borderTopColor: color ? color : '#CCC',
                    }}
                />
            </div>
        </div>
    );
};

export default DividerBlock;
