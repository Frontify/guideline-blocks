/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, ColorPickerFlyout, useMemoizedId } from '@frontify/fondue';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { chain } from '../../../Utilities/chain';
import { FormControllerWrap } from '../ControllerWrap';
import { FormColorPickerProps } from './types';

export const FormColorPicker = <T extends FieldValues>({
    id,
    label,
    helper,
    style,
    extra,
    disabled,
    palettes,
    name,
    onSelect,
    onClose,
    clearable,
    autoError,
    transformers,
}: FormColorPickerProps<T>) => {
    const memoId = useMemoizedId(id);
    const [temporaryColor, setTemporaryColor] = useState<Color | null>(null);

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
                <ColorPickerFlyout
                    id={memoId}
                    currentColor={temporaryColor ?? (transformers?.in ? transformers.in(field.value) : field.value)}
                    onSelect={chain(setTemporaryColor, onSelect)}
                    palettes={palettes}
                    onClick={() => {
                        field.onChange(transformers?.out ? transformers.out(temporaryColor) : temporaryColor);
                        setTemporaryColor(null);
                    }}
                    onClose={chain(onClose, () => {
                        setTemporaryColor(null);
                    })}
                    clearable={clearable}
                    onClear={() => {
                        field.onChange(transformers?.out ? transformers.out(null) : null);
                        setTemporaryColor(null);
                    }}
                />
            )}
        </FormControllerWrap>
    );
};
