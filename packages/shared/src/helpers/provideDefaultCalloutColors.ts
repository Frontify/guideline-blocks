/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens } from '../hooks';
import { defaultCalloutColors } from './defaultTokens';

export const provideDefaultCalloutColors = (appearanceData: DesignTokens): DesignTokens => {
    return {
        ...appearanceData,
        callout: {
            note: appearanceData.callout?.note || defaultCalloutColors.note,
            info: appearanceData.callout?.info || defaultCalloutColors.info,
            tip: appearanceData.callout?.tip || defaultCalloutColors.tip,
            warning: appearanceData.callout?.warning || defaultCalloutColors.warning,
        },
    };
};
