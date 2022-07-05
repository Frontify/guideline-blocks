/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartProps } from '../types';

export const BlockBarChart: FC<ChartProps> = ({ data, height, color, labelColor }) => {
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#EEEEEE" />
                <Bar dataKey="x" fill={color} barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    );
};
