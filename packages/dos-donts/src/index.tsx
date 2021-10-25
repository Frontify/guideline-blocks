/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { ReactElement, FC } from 'react';
import { RichTextEditor } from '@frontify/arcade';
import { AppBridgeNative } from '@frontify/app-bridge';
import { useBlockSettings } from '@frontify/app-bridge/react';
import { DoDontType, DoDontStyle } from './types';

type DosDontsBlockProps = {
    appBridge: AppBridgeNative;
};

type Settings = {
    backgroundColor: string;
    borderColor: string;
    showBorder: boolean;
};

type ItemProps = {
    type: DoDontType;
    style: DoDontStyle;
};

const Item: FC<ItemProps> = ({ type, style }) => {
    console.log({ style });
    return (
        <div>
            <h3>Add Title</h3>
            <RichTextEditor placeholder="Add a description" />
        </div>
    );
};

const DosDontsBlock: FC<DosDontsBlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);

    const { style }: { style: DoDontStyle } = blockSettings;

    return (
        <div>
            <Item type={DoDontType.Do} style={style} />
            <Item type={DoDontType.Dont} style={style} />
        </div>
    );
};

export default DosDontsBlock;
