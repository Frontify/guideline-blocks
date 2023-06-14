/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    REQUIRED_FORM_DATA,
    REQUIRED_FORM_DATA_LABEL,
    STANDARD_METADATA,
    STANDARD_METADATA_LABEL,
    defaultStandardMetaData,
} from '../constant';
import { Settings } from '../../../../types';

type FormConfigurationResponse = [
    ('name' | 'email' | 'disclaimer' | 'description' | 'creator' | 'copyrightStatus' | 'copyrightNotice')[],
    {
        creator: string;
        copyrightStatus: string;
        name: string;
        copyrightNotice: string;
        description: string;
        email: string;
        disclaimer: string;
    },
    ('disclaimer' | 'name' | 'email')[]
];

export const getFormConfiguration = (blockSettings: Settings): FormConfigurationResponse => {
    const metadataForm = [...REQUIRED_FORM_DATA, ...STANDARD_METADATA];
    const metaDataLabels = {
        ...REQUIRED_FORM_DATA_LABEL,
        ...STANDARD_METADATA_LABEL,
    };

    const activeMetadataList = metadataForm
        .filter((item) => blockSettings[item])
        .filter((item) => item !== 'disclaimer');

    const metaData = [...defaultStandardMetaData, ...activeMetadataList];

    const requiredFields = [...REQUIRED_FORM_DATA, ...defaultStandardMetaData];

    return [metaData, metaDataLabels, requiredFields];
};
