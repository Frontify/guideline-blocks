/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ImageStageProps } from '../types';

export const isZoomable = ({
    hasLimitedOptions = true,
    allowZooming,
    allowFullScreen,
}: Pick<ImageStageProps, 'hasLimitedOptions' | 'allowZooming' | 'allowFullScreen'>) =>
    !hasLimitedOptions && (allowZooming || allowFullScreen);
