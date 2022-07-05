/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Checklist, ChecklistDirection, ChecklistProps } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormChecklistProps } from './types';

export const FormChecklist = <T extends FieldValues>({
    name,
    style,
    helper,
    extra,
    direction,
    transformers,
    checkboxes,
    ariaLabel,
    disabled,
    columns,
    label,
    autoError,
}: FormChecklistProps<T>) => (
    <FormControllerWrap
        name={name}
        helper={helper}
        extra={extra}
        style={style}
        autoError={autoError}
        label={{ ...label, htmlFor: '' }}
    >
        {({ field }) => {
            const sharedProps: ChecklistProps = {
                activeValues: transformers?.in ? transformers.in(field.value) : field.value,
                setActiveValues: (value) => field.onChange(transformers?.out ? transformers.out(value) : value),
                checkboxes: disabled ? checkboxes.map((checkbox) => ({ ...checkbox, disabled: true })) : checkboxes,
                ariaLabel,
                direction,
            };

            return direction === ChecklistDirection.Vertical ? (
                <Checklist {...sharedProps} direction={ChecklistDirection.Vertical} columns={columns ?? undefined} />
            ) : (
                <Checklist {...sharedProps} />
            );
        }}
    </FormControllerWrap>
);
