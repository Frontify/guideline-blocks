import {
    IconCross20,
    LoadingCircle,
    LoadingCircleSize,
    LoadingCircleStyle,
    Stack,
} from "@frontify/fondue";
import React from "react";
import { getMimeTypeIcon } from "./helper";
import { joinClassNames } from "@frontify/guideline-blocks-shared";
import { Status } from "../../model/QueryFile";

export type UploadFileProps = {
    type: string;
    name: string;
    identifier: string;
    status: Status;
    last: boolean;
    onDelete: (identifier: string) => void;
};

export const UploadFile = ({
    type,
    name,
    identifier,
    status,
    last,
    onDelete,
}: UploadFileProps) => {
    return (
        <li
            className={joinClassNames([
                "tw-flex tw-justify-between tw-items-center tw-pt-4 tw-pb-4",
                !last && "tw-border-b tw-border-[#08080826] ",
            ])}
        >
            <Stack padding="none" spacing="s" align="center">
                {status === Status.PENDING ? (
                    <LoadingCircle
                        size={LoadingCircleSize.Small}
                        style={LoadingCircleStyle.Progress}
                    />
                ) : (
                    getMimeTypeIcon(type)
                )}
                <p>{name}</p>
            </Stack>
            <div
                className="tw-cursor-pointer"
                onClick={() => onDelete(identifier)}
            >
                <IconCross20 />
            </div>
        </li>
    );
};
