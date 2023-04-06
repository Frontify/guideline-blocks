import React, { FC } from "react";

interface FormLabelProps {
    id: string;
}

export const FormLabel: FC<FormLabelProps> = ({ id, children }) => (
    <div className="tw-pb-2">
        <label
            className="tw-font-body tw-max-w-full tw-font-regular tw-text-body-medium tw-text-text tw-no-underline tw-break-normal tw-whitespace-normal tw-overflow-visible"
            htmlFor={id}
        >
            {children}
        </label>
    </div>
);
