/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Text } from '@frontify/fondue';

interface FormLabelProps {
    id: string;
    isRequired: boolean;
    children?: React.ReactNode;
}

// we can just use the FormLabel and make a new Component around it

export const FormLabel: FC<FormLabelProps> = ({ id, children, isRequired }) => (
    <div className="tw-pb-2">
        <label
            className="tw-font-body tw-max-w-full tw-font-medium tw-text-body-medium tw-text-text-weak tw-no-underline tw-break-normal tw-whitespace-normal tw-overflow-visible"
            htmlFor={id}
        >
            {children}
            {isRequired && (
                <Text as="span" color={'negative'}>
                    {' *'}
                </Text>
            )}
        </label>
    </div>
);
