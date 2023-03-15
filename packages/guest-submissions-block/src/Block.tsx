import type {FC} from 'react';
import React from "react";
import {useBlockSettings} from '@frontify/app-bridge';
import type {BlockProps} from '@frontify/guideline-blocks-settings';
import {Settings} from "./types";
import {Headline} from "./components/Headline";

export const AnExampleBlock: FC<BlockProps> = ({appBridge}) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);

    return (
        <>
            <Headline appBridge={appBridge}/>


        </>
    );
};
