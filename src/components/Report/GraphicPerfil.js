import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  {
    name: '0h',
    autoproduction: 0,
    electric: 2,
  },
  {
    name: '2h',
    autoproduction: 0,
    electric: 2,
  },
  {
    name: '4h',
    autoproduction: 0,
    electric: 2,
  },
  {
    name: '6h',
    autoproduction: 0,
    electric: 5,
  },
  {
    name: '8h',
    autoproduction: 2,
    electric: 6,
  },
  {
    name: '10h',
    autoproduction: 5,
    electric: 7,
  },
  {
    name: '12h',
    autoproduction: 6,
    electric: 10,
  },
  {
    name: '14h',
    autoproduction: 5,
    electric: 8,
  },
  {
    name: '16h',
    autoproduction: 7,
    electric: 4,
  },
  {
    name: '18h',
    autoproduction: 5,
    electric: 2,
  },
  {
    name: '20h',
    autoproduction: 4,
    electric: 0,
  },
  {
    name: '22h',
    autoproduction: 2,
    electric: 0,
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

      <Area
        type="monotone"
        dataKey="electric"
        stroke="#4671ad"
        strokeWidth={3}
        fill="#a1bee5"
      />
      <Area
        type="monotone"
        dataKey="autoproduction"
        stroke="#ff9700"
        strokeWidth={3}
        fill="#ffc100"
        label={'Autoproduccio'}
      />

      <Legend verticalAlign="bottom" align="right" height={36} />
    </AreaChart>
  </ResponsiveContainer>
)

export default GraphicPerfil
