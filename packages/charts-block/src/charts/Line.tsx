/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartProps } from '../types';

export const BlockLineChart: FC<ChartProps> = ({ data, height, color, labelColor }) => {
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#EEEEEE" />
                <Line type="monotone" dataKey="x" stroke={color} strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    );
};
