/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartProps } from '../types';

export const BlockLineChart: FC<ChartProps> = ({ data, height }) => {
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend
                    width={100}
                    wrapperStyle={{
                        top: 40,
                        right: 20,
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #d5d5d5',
                        borderRadius: 3,
                        lineHeight: '40px',
                    }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};
