/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { BlockProps } from '@frontify/guideline-blocks-settings';

import 'tailwindcss/tailwind.css';
import '@frontify/guideline-blocks-settings/styles';

export const UIPatternBlock = ({ appBridge }: BlockProps): ReactElement => {
    return <div className="ui-pattern-block"></div>;
};
