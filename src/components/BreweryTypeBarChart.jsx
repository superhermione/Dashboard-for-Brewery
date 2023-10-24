
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

function BreweryTypeBarChart({ data }) {
    // Prepare data for chart
    const chartData = data.reduce((acc, brewery) => {
        const index = acc.findIndex(item => item.type === brewery.brewery_type);
        if (index === -1) {
            acc.push({ type: brewery.brewery_type, count: 1 });
        } else {
            acc[index].count += 1;
        }
        return acc;
    }, []);

    return (
        <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    );
}

export default BreweryTypeBarChart;
