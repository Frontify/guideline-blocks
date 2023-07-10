/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MetadataProps, MetadataType } from '../type';
import { FormUtilities, OnChangeProps } from '../Form/type';
import { InputDate, InputLong, InputNumber, InputText, MultiSelectDropdown, SelectDropdown } from '../Form';
import { Validation } from '@frontify/fondue';

type TypeMapObject = Record<MetadataType, React.FC<MetadataProps & FormUtilities>>;

export class CustomMetadataFactory {
    static MetadataTypeMap: TypeMapObject = {
        [MetadataType.TEXT]: InputText,
        [MetadataType.LONGTEXT]: InputLong,
        [MetadataType.NUMBER]: InputNumber,
        [MetadataType.DATE]: InputDate,
        [MetadataType.MULTISELECT]: MultiSelectDropdown,
        [MetadataType.SELECT]: SelectDropdown,
    };

    static getFormElements(
        metadataList: MetadataProps[],
        onChange: (val: OnChangeProps) => void,
        errorFields: string[]
    ) {
        return metadataList.map((metadata) => {
            const { name } = metadata.type;
            const Template = CustomMetadataFactory.MetadataTypeMap[name];

            return !!Template ? (
                <Template
                    {...metadata}
                    key={`${metadata.id}-custom-metadata`}
                    onChange={onChange}
                    validation={errorFields.includes(metadata.id) ? Validation.Error : Validation.Default}
                />
            ) : (
                <></>
            );
        });
    }
}
