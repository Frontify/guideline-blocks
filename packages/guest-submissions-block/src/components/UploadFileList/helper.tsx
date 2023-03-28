import { IconDocument20, IconImage20 } from "@frontify/fondue";
import React from "react";

export const getMimeTypeIcon = (type: string) => {
    switch (type) {
        case "image/png":
            return <IconImage20 />;
        default:
            return <IconDocument20 />;
    }
};
