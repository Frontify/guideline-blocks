import React, { FC } from "react";
import { BlockProps } from "@frontify/guideline-blocks-settings";
import { Button, Stack } from "@frontify/fondue";
import { Metadata } from "../Components/MetaData";
import { Headline, ModalHeadline } from "../Components/Headline";
import { Settings } from "../types";
import { useBlockSettings } from "@frontify/app-bridge";

export const EditorMode: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] =
        useBlockSettings<Settings>(appBridge);
    return (
        <Stack padding="s" spacing="s" direction={"column"}>
            <div className="tw-bg-base-alt tw-rounded tw-flex tw-justify-between tw-content-center tw-items-center tw-p-4">
                <Headline appBridge={appBridge} />
                <div>
                    <Button onClick={() => console.log("*open")}>
                        {blockSettings.buttonText}
                    </Button>
                </div>
            </div>
            <div className="tw-rounded tw-bg-base-alt">
                <Stack padding="l" spacing="s" direction={"column"}>
                    <ModalHeadline appBridge={appBridge} />
                    <Metadata
                        onSubmit={(formData) => {
                            console.log(false);
                        }}
                    ></Metadata>
                </Stack>
            </div>
        </Stack>
    );
};
