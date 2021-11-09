/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC, useEffect, useState } from 'react';
import { AppBridgeNative, useBlockSettings } from '@frontify/app-bridge';
import { EditableText } from './EditableText';
import { alignmentMap, BlockSettings, cornerRadiusMap, paddingMap, typeMap, widthMap } from './types';
import { Icon } from './Icon';

type CustomPaddingStyles = {
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
};

type CustomCornerRadius = {
    borderRadius: string;
};

type CalloutBlockProps = {
    appBridge: AppBridgeNative;
};

const CalloutBlock: FC<CalloutBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const {
        type,
        alignment,
        iconSwitch,
        width,
        customPaddingSwitch,
        customCornerRadiusSwitch,
        icon,
        padding,
        customPadding = [],
        cornerRadius,
        customCornerRadius = [],
    } = blockSettings;
    const [customPaddingStyle, setCustomPaddingStyle] = useState<CustomPaddingStyles>();
    const [customCornerRadiusStyle, setCustomCornerRadiusStyle] = useState<CustomCornerRadius>();
    const [iconUrl, setIconUrl] = useState<string>();

    useEffect(() => {
        const paddingStyle = customPaddingSwitch
            ? {
                  paddingTop: customPadding[0],
                  paddingRight: customPadding[2],
                  paddingBottom: customPadding[3],
                  paddingLeft: customPadding[1],
              }
            : undefined;
        const cornerRadiusStyle = customCornerRadiusSwitch
            ? {
                  borderRadius: `${customCornerRadius[0]} ${customCornerRadius[1]} ${customCornerRadius[3]} ${customCornerRadius[2]}`,
              }
            : undefined;
        setCustomPaddingStyle(paddingStyle);
        setCustomCornerRadiusStyle(cornerRadiusStyle);

        if (iconSwitch && icon) {
            appBridge.getAssetById(icon).then((iconAsset) => {
                setIconUrl(iconAsset.generic_url);
            });
        }
    }, [blockSettings]);

    const getClassName = () => {
        let className = `tw-text-white ${typeMap[type]} ${alignmentMap[alignment]} ${widthMap[width]} `;

        if (!customPaddingSwitch && padding) {
            className += `${paddingMap[padding]} `;
        }

        if (!customCornerRadiusSwitch && cornerRadius) {
            className += `${cornerRadiusMap[cornerRadius]} `;
        }

        return className;
    };

    return (
        <div className={getClassName()} style={{ ...customPaddingStyle, ...customCornerRadiusStyle }}>
            {iconSwitch && iconUrl && <Icon url={iconUrl} />}
            <EditableText type={type} appBridge={appBridge} />
        </div>
    );
};

export default CalloutBlock;
