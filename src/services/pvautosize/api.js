import axios from 'axios'
// const { HEMAN_API_URL } = window.config
// https://api.mapbox.com/geocoding/v5/mapbox.places/515%2015th%20St%20NW%2C%20Washington%2C%20DC%2020004.json?types=address&access_token=YOUR_MAPBOX_ACCESS_TOKEN

const API_BASE = 'https://heman-demo.somenergia.lan/api'

export const geocodeAddress = async (address) => {
  const encodedAddress = encodeURI(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  return await fetch(url).then((data) => data.json())
}

export const getPVScenario = async (params) => {
  // https://heman-demo.somenergia.lan/api/ScenarioReport/0065020?tilt=30.0&azimuth=180%230

  const { contract, token, installationParams } = params

  delete installationParams.power

  delete installationParams?.scenario
  const url = `${API_BASE}/ScenarioReport/${contract}`
  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return axios({
    method: 'GET',
    url,
    headers,
    params: installationParams,
  }).then((response) => {
    return response?.data
  })
}

export const getContractParams = async ({ token, contract }) => {
  const url = `https://heman-demo.somenergia.lan/api/ScenarioParams/${contract}`

  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return await axios({
    method: 'GET',
    url,
    headers,
  }).then((response) => {
    return response?.data
  })
}

export const getReport = async ({ token, contract, ...params }) => {
  const url = `https://heman-demo.somenergia.lan/api/ScenarioReport/${contract}`

  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  }

  return await axios({
    method: 'GET',
    url,
    headers,
    params,
  }).then((response) => {
    return response?.data
  })
}
