import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Enero',
    uv: 5,
    pv: 19,
    amt: 5,
  },
  {
    name: 'Febrero',
    uv: 5,
    pv: 17,
    amt: 5,
  },
  {
    name: 'Marzo',
    uv: 5,
    pv: 17,
    amt: 5,
  },
  {
    name: 'Abril',
    uv: 6,
    pv: 17,
    amt: 8,
  },
  {
    name: 'Mayo',
    uv: 7,
    pv: 24,
    amt: 9,
  },
  {
    name: 'Junio',
    uv: 7,
    pv: 24,
    amt: 9,
  },
  {
    name: 'Julio',
    uv: 9,
    pv: 24,
    amt: 10,
  },
]

const ReportConsumGraph = () => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend verticalAlign="bottom" align="right" height={36} />
      <Bar dataKey="pv" stackId="a" fill="#b9db42" />
      <Bar dataKey="uv" stackId="a" fill="#beaf17" />
      <Bar dataKey="amt" stackId="a" fill="#d72929" />
    </BarChart>
  </ResponsiveContainer>
)

export default ReportConsumGraph
