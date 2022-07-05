/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, useMemoizedId } from '@frontify/fondue';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormDropdownProps } from './types';

export const FormDropdown = <T extends FieldValues>({
    name,
    label,
    helper,
    extra,
    style,
    disabled,
    id,
    autoResize,
    alignment,
    ariaLabel,
    menuBlocks,
    placeholder,
    size,
    clearable,
    decorator,
    position,
    autoError,
    transformers,
}: FormDropdownProps<T>) => {
    const memoId = useMemoizedId(id);

    return (
        <FormControllerWrap
            name={name}
            helper={helper}
            extra={extra}
            autoError={autoError}
            label={{ ...label, htmlFor: memoId }}
            style={style}
            disabled={disabled}
        >
            {({ field }) => (
                <Dropdown
                    id={memoId}
                    menuBlocks={menuBlocks}
                    autoResize={autoResize}
                    alignment={alignment}
                    ariaLabel={ariaLabel}
                    onChange={(value) => field.onChange(transformers?.out ? transformers.out(value) : value)}
                    placeholder={placeholder}
                    size={size}
                    decorator={decorator}
                    disabled={disabled}
                    clearable={clearable}
                    position={position}
                    activeItemId={transformers?.in ? transformers.in(field.value) : field.value}
                />
            )}
        </FormControllerWrap>
    );
};
