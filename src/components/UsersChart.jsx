import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Admins", value: 1 },
  { name: "Usuarios", value: 10 }
];
const COLORS = ["#6a1b9a", "#8884d8"];

export default function UsersChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={70}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
