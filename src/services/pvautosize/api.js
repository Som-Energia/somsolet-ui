import axios from 'axios'
// https://api.mapbox.com/geocoding/v5/mapbox.places/515%2015th%20St%20NW%2C%20Washington%2C%20DC%2020004.json?types=address&access_token=YOUR_MAPBOX_ACCESS_TOKEN

const API_BASE = process.env.REACT_APP_HEMAN_API_URL

export const geocodeAddress = async (address) => {
  const encodedAddress = encodeURI(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  return await fetch(url).then((data) => data.json())
}

export const getPVScenario = async (params) => {

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
  const url = `${API_BASE}/ScenarioParams/${contract}`

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

export const getReport = async ({ token, contract, azimuth, ...params }) => {
  const customAzimuth = Array.isArray(azimuth)
    ? `?azimuth=${azimuth[0]}&azimuth=${azimuth[1]}`
    : `?azimuth=${azimuth}`

  const url = `${API_BASE}/ScenarioReport/${contract}${customAzimuth}`

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
