/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { ChartProps } from '../types';

export const BlockBarChart: FC<ChartProps> = ({ data }) => {
    console.log({ data });
    return <div>bar chart</div>;
};
