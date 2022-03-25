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

const GraphicPerfil = ({ profile, autoproduction }) => {
  const data = profile.map((value, k) => ({
    name: `${k}h`,
    profile: value,
    autoproduction: autoproduction[k],
  }))

  return (
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
          dataKey="profile"
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
}

export default GraphicPerfil
