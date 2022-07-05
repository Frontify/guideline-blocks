/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor, useMemoizedId } from '@frontify/fondue';
import { chain } from 'Client/Utility/chain';
import { FieldValues } from 'react-hook-form';
import { FormControllerWrap } from '../ControllerWrap';
import { FormRichTextEditorProps } from './types';

export const FormRichTextEditor = <T extends FieldValues>({
    name,
    id,
    disabled,
    placeholder,
    readonly,
    style,
    helper,
    extra,
    label,
    onBlur,
    clear,
    autoError,
    designTokens,
    transformers,
    actions,
}: FormRichTextEditorProps<T>) => {
    const memoId = useMemoizedId(id);

    return (
        <FormControllerWrap
            name={name}
            helper={helper}
            extra={extra}
            label={{ ...label, htmlFor: memoId }}
            style={style}
            autoError={autoError}
            disabled={disabled}
        >
            {({ field }) => (
                <RichTextEditor
                    clear={clear}
                    id={memoId}
                    onBlur={chain(onBlur, field.onBlur)}
                    onTextChange={(value) => field.onChange(transformers?.out ? transformers.out(value) : value)}
                    readonly={readonly}
                    designTokens={designTokens}
                    placeholder={placeholder}
                    actions={actions}
                    value={transformers?.in ? transformers.in(field.value) : field.value}
                />
            )}
        </FormControllerWrap>
    );
};
