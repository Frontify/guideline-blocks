import { IconCheck } from "@frontify/arcade";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useToggleState } from "@react-stately/toggle";
import React, { ReactElement, useContext, useRef } from "react";
import { SettingsContext } from "..";
import { CheckboxProps, DefaultValues } from "../types";
import { FOCUS_STYLE } from "../utilities/focusStyle";
import { CheckboxLabel } from "./CheckboxLabel";
import { joinClassNames } from "@frontify/guideline-blocks-shared";

export const Checkbox = ({
    id,
    disabled,
    label,
    dateCompleted,
    ariaLabel,
    checked,
    showLabel,
    onChange,
}: CheckboxProps): ReactElement => {
    const inputRef = useRef(null);

    const { isFocusVisible, focusProps } = useFocusRing();

    const toggleState = useToggleState({
        onChange: disabled ? undefined : onChange,
        isSelected: checked,
    });

    const { inputProps } = useCheckbox(
        {
            isDisabled: disabled,
            isRequired: false,
            "aria-label": ariaLabel || label,
        },
        toggleState,
        inputRef
    );

    const { completeCheckboxColor, incompleteCheckboxColor } =
        useContext(SettingsContext);

    return (
        <label
            className={joinClassNames([
                "tw-group tw-flex tw-gap-2 tw-select-none tw-outline-none",
                !disabled && "hover:tw-cursor-pointer",
            ])}
        >
            <input
                {...mergeProps(inputProps, focusProps)}
                id={id}
                ref={inputRef}
                className="tw-sr-only"
                data-test-id="checkbox-input"
            />
            <span
                aria-hidden="true"
                className={joinClassNames([
                    "tw-relative tw-flex tw-w-4 tw-h-4 tw-items-center tw-justify-center tw-rounded tw-border tw-flex-shrink-0 tw-bg-white tw-text-white",
                    isFocusVisible && FOCUS_STYLE,
                    disabled && joinClassNames(["tw-pointer-events-none"]),
                ])}
                style={{
                    background: checked ? completeCheckboxColor.hex : "",
                    border: joinClassNames([
                        "1px",
                        "solid",
                        checked && !disabled && completeCheckboxColor.hex,
                        !checked && !disabled && incompleteCheckboxColor.hex,
                        disabled && DefaultValues.incompleteCheckboxColor.hex,
                    ]),
                }}
            >
                {checked && <IconCheck />}
            </span>
            {showLabel && (
                <CheckboxLabel
                    disabled={disabled}
                    htmlFor={id}
                    dateInMs={dateCompleted}
                >
                    {label}
                </CheckboxLabel>
            )}
        </label>
    );
};
