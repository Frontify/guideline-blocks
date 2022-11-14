/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType } from '@frontify/app-bridge';

export const AssetChooserConfig = {
    projectTypes: [
        AssetChooserProjectType.IconLibrary,
        AssetChooserProjectType.LogoLibrary,
        AssetChooserProjectType.MediaLibrary,
    ],
    objectTypes: [AssetChooserObjectType.ImageVideo],
    multiSelection: false,
};
