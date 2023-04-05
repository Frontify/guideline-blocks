import { Validation } from "@frontify/fondue";
import React from "react";

export type OnChangeProps = {
    id: string;
    value: string;
};
export type FormUtilities = {
    onChange: (val: OnChangeProps) => void;
    validation?: Validation;
    decorator?: React.ReactNode;
};
