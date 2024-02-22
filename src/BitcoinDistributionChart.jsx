import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: '1,000,000 - 100,000', count: 4 },
    { name: '100,000 - 10,000', count: 107 },
    { name: '10,000 - 1,000', count: 1905 },
    { name: '1,000 - 100', count: 13853 },
    { name: '100 - 10', count: 138514 },
    { name: '10 - 1', count: 860899 },
    { name: '1 - 0.1', count: 3527938 },
    { name: '0.1 - 0.01', count: 7964510 },
    { name: '0.01 - 0.001', count: 11844472 },
    { name: '0.001 - 0.0001', count: 12748660 },
    { name: '0.0001 - 0.00001', count: 9076400 },
    { name: '0.00001 - 0.000001', count: 2623072 },
    { name: '0.000001 - 0', count: 219366 },
    { name: '< 0.000001', count: 540582 },
];

const BlockchainChart = () => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart
            layout="vertical"
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
            barSize={10}
        >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" width={200} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

export default BlockchainChart;
