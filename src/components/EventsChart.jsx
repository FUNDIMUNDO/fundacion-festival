import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const TODAY = new Date();

export default function EventsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const snap = await getDocs(collection(db, 'events'));
      const counts = {};
      snap.docs.forEach((doc) => {
        const { fecha } = doc.data();
        const date = new Date(fecha);
        if (date >= TODAY) {
          const m = monthNames[date.getMonth()];
          counts[m] = (counts[m] || 0) + 1;
        }
      });
      // crear array con todos los meses (0..11)
      const chartData = monthNames.map((m) => ({
        month: m,
        events: counts[m] || 0,
      }));
      setData(chartData);
    }
    fetchEvents();
  }, []);

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="events" fill="#6a1b9a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
