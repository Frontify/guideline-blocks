import React, { useState } from "react";
import { UploadFile, UploadFileProps } from "./UploadFile";
import {
    Divider,
    IconCaretDown16,
    IconCaretUp16,
    LoadingCircle,
    LoadingCircleSize,
    LoadingCircleStyle,
} from "@frontify/fondue";

type FileUploadListProps = {
    entries: UploadFileProps[];
};

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
        <div className="tw-bg-base-alt tw-px-2">
            <div className="" onClick={() => setOpen(!open)}>
                {entries.length > 0 && (
                    <div className="tw-flex tw-justify-center tw-p-[18px] tw-gap-2 tw-cursor-pointer tw-border-bottom tw-border-line-strong">
                        {loadingBar()}
                        <h5>{entries.length} files uploading</h5>
                        {open ? <IconCaretUp16 /> : <IconCaretDown16 />}
                    </div>
                )}
            </div>
            {open && (
                <>
                    <Divider color="rgb(234, 235, 235)" />
                    <ul>
                        {entries.map((entry) => (
                            <UploadFile {...entry} key={entry.identifier} />
                        ))}
                    </ul>
                </>
            )}
        </div>
    ) : (
        <></>
    );
};
