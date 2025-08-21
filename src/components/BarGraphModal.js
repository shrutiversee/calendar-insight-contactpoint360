import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ChartDisplayModal = ({ date, onClose }) => {
  const scheduleData = useSelector((state) => state.schedule.scheduleData);
  const data = scheduleData[date]?.map((participant) => {
    const key = Object.keys(participant)[0];
    return { name: key, value: participant[key] };
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>📊 Data Analytics for {date}</h2>
        <div style={{ width: '100%', height: 400, marginBottom: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'white', fontSize: 12 }}
                axisLine={{ stroke: 'white' }}
              />
              <YAxis 
                tick={{ fill: 'white', fontSize: 12 }}
                axisLine={{ stroke: 'white' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
                itemStyle={{ color: 'black', fontSize: 12 }}
                labelStyle={{ color: 'black', fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ecdc4" />
                  <stop offset="100%" stopColor="#44a08d" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <button onClick={onClose}>✨ Close</button>
      </div>
    </div>
  );
};

export default ChartDisplayModal;
