import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';

// Generate Sales Data
function createData(date, exp) {
  return { 날짜: date, 경험치: exp };
}
const data = [
  createData('11월 22일', 0),
  createData('11월 23일', 300),
  createData('11월 24일', 600),
  createData('11월 25일', 800),
  createData('11월 26일', 1300),
  createData('11월 27일', 1400),
  createData('11월 28일', 2000),
  createData('11월 29일', 2100),
];
function formatXAxis(tickItem) {
  return tickItem;
}
const Chart = () => {
  return(<ResponsiveContainer>
    <LineChart
      data={data}
      margin={{
        top: 16,
        right: 16,
        bottom: 0,
        left: 24,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
      <XAxis dataKey="날짜" tickFormatter={formatXAxis} />
      <YAxis domain={['dataMin', 'dataMax+100']}>
        <Label angle={270} position="left" style={{ textAnchor: 'middle', fontWeight: 'bold' }} >
          Exp
        </Label>
      </YAxis>
      <Line type="monotone" dataKey="경험치" stroke="#556CD6" dot={true} />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>);
}

export default Chart;