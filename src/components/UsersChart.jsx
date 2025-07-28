import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const COLORS = ['#6a1b9a', '#8884d8'];

export default function UsersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const snap = await getDocs(collection(db, 'users'));
      let adminCount = 0;
      let userCount = 0;
      snap.docs.forEach((doc) => {
        const { role } = doc.data();
        if (role === 'admin') adminCount++;
        else userCount++;
      });
      setData([
        { name: 'Admins', value: adminCount },
        { name: 'Usuarios', value: userCount },
      ]);
    }
    fetchUsers();
  }, []);

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={70} label>
          {data.map((entry, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
