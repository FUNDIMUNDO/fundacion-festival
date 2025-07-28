import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { month: 'Ene', events: 2 },
  { month: 'Feb', events: 5 },
  { month: 'Mar', events: 3 },
  { month: 'Abr', events: 4 },
  { month: 'May', events: 6 },
  { month: 'Jun', events: 1 }
];

export default function EventsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={sampleData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="events" fill="#6a1b9a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
