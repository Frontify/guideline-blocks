/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartProps } from '../types';

export const BlockBarChart: FC<ChartProps> = ({ data, height, color }) => {
    const heightInt = parseInt(height, 10);
    return (
        <ResponsiveContainer width="100%" height={heightInt}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke={color} />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
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
                <Bar dataKey="x" fill={color} barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    );
};
