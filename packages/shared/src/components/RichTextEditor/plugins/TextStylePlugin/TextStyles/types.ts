/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SelectableTextStyles } from '.';
import { PluginProps } from '@frontify/fondue';

export type TextStylePluginProps = PluginProps & {
    textStyles: SelectableTextStyles[];
};
