/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Settings } from '../../../types';
import { CustomMetadataFormValues } from '../Metadata';
import { MetadataProps } from '../type';

type MetadataIds = {
    [key: string]: string | string[] | boolean | number | MetadataProps[];
};

export const DATA_DELIMINATOR = '--#--';

export const useMetadataSettingsConfig = (blockSettings: Settings): [CustomMetadataFormValues, MetadataProps[]] => {
    const metadataConfiguration = getMetadataConfiguration(blockSettings);

    return [getInitialValues(metadataConfiguration), metadataConfiguration];
};

const getMetadataConfiguration = (blockSettings: Settings): MetadataProps[] => {
    const initialMetadataConfiguration = setRequiredToFalse(blockSettings.assetSubmissionMetadataConfig);
    const activeMetadataFromSettings = filterOutCustomMetadataFields(blockSettings);

    return setActiveMetadataFields(activeMetadataFromSettings, initialMetadataConfiguration);
};

const setRequiredToFalse = (assetSubmissionMetadataConfig: MetadataProps[]): MetadataProps[] =>
    !!assetSubmissionMetadataConfig
        ? assetSubmissionMetadataConfig.map((entry: MetadataProps) => ({
              ...entry,
              isRequired: false,
          }))
        : [];

const filterOutCustomMetadataFields = (blockSettings: Settings): MetadataIds[] =>
    Object.entries(blockSettings)
        .filter(([key, value]) => key.includes(DATA_DELIMINATOR) && !!value)
        .map(([key, value]) => ({ [key]: value }));

const setActiveMetadataFields = (
    activeMetadataFromSettings: MetadataIds[],
    initialMetadataConfig: MetadataProps[]
): MetadataProps[] =>
    activeMetadataFromSettings.reduce((acc: MetadataProps[], cur) => {
        const [key] = Object.keys(cur);
        const [, id] = key.split(DATA_DELIMINATOR);

        const metadataEntry = initialMetadataConfig.find((item) => item.id === id);
        if (!isMetadataProperty(key, Object.values(cur)[0]) || !metadataEntry) {
            return acc || [];
        }
        const metadataConfig = setOptionalModifiers(metadataEntry, activeMetadataFromSettings);

        return acc ? [...acc, metadataConfig] : [metadataConfig];
    }, []);

const isMetadataProperty = (key: string, value: string | string[] | boolean | number | MetadataProps[]) => {
    const [, , modifier] = key.split(DATA_DELIMINATOR);
    if (!modifier) {
        return Array.isArray(value) ? value.length > 1 : false;
    }
    return false;
};

const setOptionalModifiers = (metadataConfig: MetadataProps, activeMetadataIds: MetadataIds[]): MetadataProps => {
    for (const entry of activeMetadataIds) {
        const matchingKey = Object.keys(entry).find(
            (key) => key.includes(metadataConfig.id) && (key.includes('required') || key.includes('label'))
        );
        if (matchingKey) {
            const [, , modifier] = matchingKey.split(DATA_DELIMINATOR);
            if (modifier === 'required') {
                metadataConfig.isRequired = !!entry[matchingKey];
            } else if (modifier === 'label') {
                metadataConfig.name = entry[matchingKey] as string;
            }
        }
    }

    return metadataConfig;
};

const getInitialValues = (metadataConfiguration: MetadataProps[]): CustomMetadataFormValues =>
    metadataConfiguration.reduce(
        (prev: CustomMetadataFormValues, cur) =>
            !!cur.defaultValue
                ? {
                      ...prev,
                      [cur.id]: cur.defaultValue,
                  }
                : prev,
        {}
    );
