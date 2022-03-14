import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
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

const GraphicPerfil = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
)

export default GraphicPerfil
