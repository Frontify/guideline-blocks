/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Slider, useMemoizedId } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormSliderProps } from './types';

export const FormSlider = <T extends FieldValues>({
    name,
    id,
    disabled,
    helper,
    style,
    items,
    extra,
    ariaLabel,
    autoError,
    label,
    transformers,
}: FormSliderProps<T>) => {
    const memoId = useMemoizedId(id);

    return (
        <FormControllerWrap
            name={name}
            helper={helper}
            style={style}
            extra={extra}
            autoError={autoError}
            label={{ ...label, htmlFor: memoId }}
            disabled={disabled}
        >
            {({ field }) => (
                <Slider
                    items={items}
                    activeItemId={transformers?.in ? transformers.in(field.value) : field.value}
                    onChange={(value) => field.onChange(transformers?.out ? transformers.out(value) : value)}
                    ariaLabel={ariaLabel}
                    disabled={disabled}
                    id={id}
                />
            )}
        </FormControllerWrap>
    );
};
