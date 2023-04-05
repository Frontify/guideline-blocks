import { DatePicker, Text } from "@frontify/fondue";
import React, { useState } from "react";
import { MetadataProps } from "../type";
import { FormUtilities } from "./type";

export const InputDate = ({
    id,
    isRequired,
    defaultValue,
    name,
    onChange,
    validation,
    valueType: { propertyType, options },
}: MetadataProps & FormUtilities) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();
    const onFocus = () => {};

    const onInput = (date: Date | null) => {
        setSelectedDate(date);
        onChange({ id, value: date?.toString() ?? "" });
    };

    return (
        <>
            <Text as="label">
                {name} {isRequired && "*"}
            </Text>
            <DatePicker
                dateFormat="dd MMM yyyy"
                onChange={(date) => onInput(date)}
                startDate={null}
                endDate={null}
                isClearable={true}
                placeHolder="Select a date"
                shouldCloseOnSelect={true}
                variant="single"
                value={selectedDate as Date}
            />
        </>
    );
};
