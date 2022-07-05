/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartProps } from '../types';

export const BlockPieChart: FC<ChartProps> = ({ data, height, color }) => {
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <PieChart width={800} height={800}>
                <Pie dataKey="x" isAnimationActive={false} data={data} cx="50%" cy="50%" fill={color} label />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};
