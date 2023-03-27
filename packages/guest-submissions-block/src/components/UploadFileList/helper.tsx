import { IconDocument16, IconImage, IconSize } from "@frontify/fondue";
import React from "react";

export const getMimeTypeIcon = (type: string) => {
    switch (type) {
        case "image/png":
            return <IconImage size={IconSize.Size24} />;
        default:
            return <IconDocument16 size={IconSize.Size24} />;
    }
};
