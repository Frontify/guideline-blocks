/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, useState } from 'react';
import { JsonInput, MantineProvider } from '@mantine/core';
import { Accordion } from './Accordion';
import { JsonErrorMessage } from './JsonErrorMessage';

interface Props {
    label: string;
    onBlur: (newValue: string) => void;
    placeholder: string;
    value: string;
    shouldCollapseByDefault: boolean;
    borderRadius?: number;
}

export const Dependencies = ({
    label,
    onBlur,
    placeholder,
    value,
    shouldCollapseByDefault,
    borderRadius,
}: Props): ReactElement => {
    const [isOpen, setIsOpen] = useState(!shouldCollapseByDefault);
    const [innerValue, setInnerValue] = useState(value);

    return (
        <Accordion borderRadius={borderRadius} label={label} isOpen={isOpen} setIsOpen={setIsOpen}>
            <MantineProvider>
                <JsonInput
                    formatOnBlur
                    autosize
                    value={innerValue}
                    onBlur={() => onBlur(innerValue)}
                    onChange={setInnerValue}
                    placeholder={placeholder}
                    validationError={<JsonErrorMessage />}
                    className="tw-bg-base-alt tw-font-code tw-text-s"
                    classNames={{
                        input: 'tw-resize-none tw-w-full tw-outline-none tw-bg-base-alt tw-p-6',
                    }}
                />
            </MantineProvider>
        </Accordion>
    );
};
