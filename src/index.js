import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const root = document.getElementById('root')
const props = {}

if (root) {
  const attrs = Object.keys(root.dataset)
  attrs.forEach((name, index) => {
    props[name] = root.dataset[name]
  })

  props.version = process.env.REACT_APP_VERSION
  console.log(`somsolet-ui version: ${process.env.REACT_APP_VERSION}`)

  ReactDOM.render(<App {...props} />, document.getElementById('root'))
}
