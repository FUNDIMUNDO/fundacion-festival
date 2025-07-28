import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { month: 'Ene', amount: 500 },
  { month: 'Feb', amount: 750 },
  { month: 'Mar', amount: 420 },
  { month: 'Abr', amount: 900 },
  { month: 'May', amount: 300 },
  { month: 'Jun', amount: 650 }
];

export default function DonationsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={sampleData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#6a1b9a" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  );
}
