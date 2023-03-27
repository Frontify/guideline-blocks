import {
    Divider,
    IconCross20,
    LoadingCircle,
    LoadingCircleSize,
    LoadingCircleStyle,
    Stack,
} from "@frontify/fondue";
import React from "react";
import { getMimeTypeIcon } from "./helper";

export type UploadFileProps = {
    // Mimie type to set the icon
    type: string;
    name: string;
    // Identifier
    identifier: string;
    completed: boolean;
};

export const UploadFile = ({
    type,
    name,
    identifier,
    completed,
}: UploadFileProps) => {
    return (
        <li>
            <div className="tw-flex tw-justify-between tw-items-center">
                <Stack padding="none" spacing="s" align="center">
                    {!completed ? (
                        <LoadingCircle
                            size={LoadingCircleSize.Small}
                            style={LoadingCircleStyle.Progress}
                        />
                    ) : (
                        getMimeTypeIcon(type)
                    )}
                    <p>{name}</p>
                </Stack>

                <IconCross20 />
            </div>
            <Divider color="rgb(234, 235, 235)" />
        </li>
    );
};
