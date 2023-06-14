/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings, useEditorState } from '@frontify/app-bridge';
import { Settings } from '../../../../types';
import {
    Checkbox,
    CheckboxEmphasis,
    CheckboxState,
    RichTextEditor as FondueRichTextEditor,
    Text,
    Validation,
    parseRawValue,
    serializeRawToHtml,
} from '@frontify/fondue';
import React, { FC, useState } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';
import { FormLabel } from '../../Form/FormLabel';
import { OnChangeProps } from '../../Form/type';
import { PLACEHOLDER } from '../../../Headline/constant';

export const DISCLAIMER_NAME = 'disclaimer';

const DEFAULT_VALUE =
    '[{"type":"p","children":[{"text":"By continuing, I agree that I will not upload malware, unlawful materials or content that violates the intellectual property rights of others.","textStyle":"p"}]}]';
export const Disclaimer: FC<
    BlockProps & {
        validation: Validation;
        onChange: (val: OnChangeProps) => void;
    }
> = ({ appBridge, validation, onChange }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<Settings>(appBridge);
    const isEditing = useEditorState(appBridge);

    const onTextChange = (value: string) =>
        value !== blockSettings.disclaimerText && setBlockSettings({ disclaimerText: value });

    const rawValue = JSON.stringify(parseRawValue({ raw: blockSettings.disclaimerText ?? DEFAULT_VALUE }));
    const html = serializeRawToHtml(rawValue);

    const [checked, setChecked] = useState<CheckboxState>(CheckboxState.Unchecked);

    const hasError = () => validation === Validation.Error;

    return (
        <>
            <Text weight="strong" color="weak">
                <FormLabel id={'Disclaimer'} isRequired={true}>
                    <span className={hasError() ? 'tw-text-text-negative' : ''}>Disclaimer</span>
                </FormLabel>
            </Text>
            <div className="tw-flex">
                <div className={checked ? '' : 'tw-p-1'}>
                    <Checkbox
                        emphasis={CheckboxEmphasis.Weak}
                        onChange={() => {
                            checked === CheckboxState.Checked
                                ? setChecked(CheckboxState.Unchecked)
                                : setChecked(CheckboxState.Checked);
                            checked === CheckboxState.Checked
                                ? onChange({ id: 'disclaimer', value: '' })
                                : onChange({
                                      id: 'disclaimer',
                                      value: CheckboxState.Checked,
                                  });
                        }}
                        id="disclaimer"
                        state={checked}
                        value="disclaimer"
                    />
                </div>
                {!isEditing ? (
                    <label
                        className={hasError() ? 'tw-text-text-negative' : ''}
                        htmlFor={'disclaimer'}
                        data-test-id="disclaimer-html"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <FondueRichTextEditor
                        id={appBridge.getBlockId().toString()}
                        value={blockSettings.disclaimerText ?? DEFAULT_VALUE}
                        border={false}
                        placeholder={PLACEHOLDER}
                        onTextChange={onTextChange}
                        onBlur={onTextChange}
                    />
                )}
            </div>
        </>
    );
};
