import React, { useState } from "react";
import { UploadFile, UploadFileProps } from "./UploadFile";
import {
    IconCaretUp16,
    LoadingCircle,
    LoadingCircleSize,
    LoadingCircleStyle,
} from "@frontify/fondue";
import { joinClassNames } from "@frontify/guideline-blocks-shared";
import { BackgroundBase } from "../AssetDropzone";
import { BorderShape } from "../styling";

type FileUploadListProps = {
    entries: UploadFileProps[];
};

const CenterWithGap =
    "tw-flex tw-justify-center tw-items-end tw-p-[18px] tw-gap-2 tw-cursor-pointer";

export const UploadFileList = ({ entries }: FileUploadListProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const loadingBar = () =>
        entries.every((item) => item.completed) && (
            <LoadingCircle
                size={LoadingCircleSize.Small}
                style={LoadingCircleStyle.Progress}
            />
        );

    return entries.length > 0 ? (
        <div
            className={joinClassNames([
                BackgroundBase,
                BorderShape,
                "tw-border-line-xx-strong",
            ])}
        >
            <div onClick={() => setOpen(!open)}>
                {entries.length > 0 && (
                    <div
                        className={joinClassNames([
                            CenterWithGap,
                            open && "tw-border-b tw-border-[#08080826] tw-mx-2",
                        ])}
                    >
                        {loadingBar()}
                        <h5>{entries.length} files uploading</h5>

                        <div
                            className={joinClassNames([
                                !open
                                    ? "tw-rotate-180 tw-transition-all"
                                    : "tw-rotate-0 tw-transition-all",
                            ])}
                        >
                            <IconCaretUp16 />
                        </div>
                    </div>
                )}
            </div>
            {
                <ul
                    className={joinClassNames([
                        "tw-px-5 tw-overflow-scroll tw-transition-all",
                        open ? "tw-max-h-[350px]" : "tw-max-h-[0px]",
                    ])}
                >
                    {entries.map((entry, index) => (
                        <UploadFile
                            {...entry}
                            key={entry.identifier}
                            last={index === entries.length - 1}
                        />
                    ))}
                </ul>
            }
        </div>
    ) : (
        <></>
    );
};
