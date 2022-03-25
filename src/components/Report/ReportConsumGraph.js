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

const ReportConsumGraph = ({ autoconsum, consum, excedencia }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const data = months.map((month, k) => ({
    month,
    ac: autoconsum[k],
    c: consum[k],
    ex: excedencia[k],
  }))

  return (
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
        <XAxis dataKey="month" />
        <YAxis />
        <Legend verticalAlign="bottom" align="right" height={36} />
        <Bar
          dataKey="ac"
          stackId="a"
          fill="#b9db42"
          label="holi"
          legendType="f"
        />
        <Bar dataKey="c" stackId="a" fill="#beaf17" />
        <Bar dataKey="ex" stackId="a" fill="#d72929" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ReportConsumGraph
