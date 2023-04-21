import { DatePicker } from "@frontify/fondue";
import React, { useState } from "react";
import { MetadataProps } from "../type";
import { FormUtilities } from "./type";
import { FormLabel } from "./FormLabel";

export const InputDate = ({
    id,
    isRequired,
    defaultValue,
    name,
    onChange,
    validation,
}: MetadataProps & FormUtilities) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        defaultValue as Date | null
    );
    const onFocus = () => {};

    const onInput = (date: Date | null) => {
        setSelectedDate(date);
        onChange({ id, value: date?.toString() ?? "" });
    };

    return (
        <div>
            <FormLabel id={id} isRequired={isRequired}>
                {name}
            </FormLabel>

            <DatePicker
                dateFormat="dd MMM yyyy"
                onChange={(date) => onInput(date)}
                startDate={null}
                endDate={null}
                isClearable={true}
                placeHolder="Select a date"
                shouldCloseOnSelect={true}
                validation={validation}
                variant="single"
                value={selectedDate as Date}
            />
        </div>
    );
};
