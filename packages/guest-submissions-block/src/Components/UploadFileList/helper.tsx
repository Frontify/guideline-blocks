/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDocument20, IconImage20 } from '@frontify/fondue';
import React from 'react';

export const getMimeTypeIcon = (type: string) => {
    if (type.match(/image\/*/g)) {
        return <IconImage20 />;
    } else {
        return <IconDocument20 />;
    }
};
