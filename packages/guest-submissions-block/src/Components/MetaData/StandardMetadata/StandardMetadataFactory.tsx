/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { OnChangeProps } from '../Form/type';
import { Settings } from '../../../types';
import { InputText, SelectDropdown } from '../Form';
import { Validation } from '@frontify/fondue';
import { MetadataType } from '../type';
import { getFormConfiguration } from './lib/getFormConfiguration';
import { CopyRightStatus } from './type';

export class StandardMetadataFactory {
    static getFormElements(blockSettings: Settings, onChange: (val: OnChangeProps) => void, errorFields: string[]) {
        const [metaData, metaDataLabels, requiredFields] = getFormConfiguration(blockSettings);

        return metaData.map((entry) => {
            if (entry === 'copyrightStatus') {
                return (
                    <SelectDropdown
                        id={entry}
                        key={entry}
                        onChange={onChange}
                        isRequired={requiredFields.filter((item: any) => item === entry).length > 0}
                        name={metaDataLabels[entry]}
                        type={{
                            name: MetadataType.SELECT,
                            options: [
                                {
                                    id: CopyRightStatus.UNKNOWN,
                                    value: 'Unknown',
                                    isDefault: true,
                                },
                                {
                                    id: CopyRightStatus.COPYRIGHTED,
                                    value: 'Copyrighted',
                                    isDefault: false,
                                },
                                {
                                    id: CopyRightStatus.PUBLIC,
                                    value: 'Public Domain',
                                    isDefault: false,
                                },
                            ],
                        }}
                        validation={errorFields.includes(entry) ? Validation.Error : Validation.Default}
                    />
                );
            } else {
                return (
                    <InputText
                        id={entry}
                        key={entry}
                        onChange={onChange}
                        isRequired={requiredFields.filter((item: any) => item === entry).length > 0}
                        name={metaDataLabels[entry]}
                        type={{ name: MetadataType.TEXT }}
                        validation={errorFields.includes(entry) ? Validation.Error : Validation.Default}
                    />
                );
            }
        });
    }
}
