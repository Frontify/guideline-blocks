/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { PieChart, ResponsiveContainer } from 'recharts';
import { ChartProps } from '../types';

export const BlockPieChart: FC<ChartProps> = ({ data, height }) => {
    console.log({ data });
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <PieChart></PieChart>
        </ResponsiveContainer>
    );
};
