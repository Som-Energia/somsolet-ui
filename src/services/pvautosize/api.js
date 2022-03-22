import axios from 'axios'
const { HEMAN_API_URL } = window.config
// https://api.mapbox.com/geocoding/v5/mapbox.places/515%2015th%20St%20NW%2C%20Washington%2C%20DC%2020004.json?types=address&access_token=YOUR_MAPBOX_ACCESS_TOKEN

export const geocodeAddress = async (address) => {
  const encodedAddress = encodeURI(address)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  console.log({ url })
  return await fetch(url).then((data) => data.json())
}

export const getPVScenario = async (params) => {
  const { contract, token, installationParams } = params
  delete installationParams?.scenario
  const url = `${HEMAN_API_URL}ScenarioReport/${contract}`
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
