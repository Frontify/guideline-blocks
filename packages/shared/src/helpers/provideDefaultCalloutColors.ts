/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DesignTokens } from '../hooks';

export const defaultCalloutColors = {
    info: '#5bc0de',
    note: '#f0ad4e',
    tip: '#5cb85c',
    warning: '#d9534f',
};

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
