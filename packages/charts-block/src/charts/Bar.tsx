/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import { ChartProps } from '../types';

export const BlockBarChart: FC<ChartProps> = ({ data, height, color, labelColor, lines }) => {
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke={labelColor} />
                <YAxis stroke={labelColor} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#EEEEEE" />
                {lines.map((line) => (
                    <Bar key={line} dataKey={line} fill={color} barSize={30} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};
