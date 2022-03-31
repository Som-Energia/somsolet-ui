import axios from 'axios'

const { API_SOMSOLET_URL, SOMSOLET_API_USERNAME, SOMSOLET_API_PASSWORD } =
  window.config

const token = Buffer.from(
  `${SOMSOLET_API_USERNAME}:${SOMSOLET_API_PASSWORD}`,
  'utf8'
).toString('base64')

export const getReport = async (data) => {
  return axios({
    method: 'GET',
    // url: `${API_SOMSOLET_URL}stages/`,
    url: 'https://run.mocky.io/v3/0dc09e7a-da78-484f-99e3-63137f0400ad',
  }).then((response) => {
    return response?.data
  })
}

export const getStages = async (data) => {
  return axios({
    method: 'GET',
    url: `${API_SOMSOLET_URL}stages/`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((response) => {
    return response?.data
  })
}

export const getCampaign = async (data) => {
  return axios({
    method: 'GET',
    url: `${API_SOMSOLET_URL}campaign/`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((response) => {
    return response?.data
  })
}

export const getProject = async (data) => {
  return axios({
    method: 'GET',
    url: `${API_SOMSOLET_URL}project/`,
    headers: {
      Authorization: `Basic ${token}`,
      dni: data.dni,
    },
  }).then((response) => {
    return response?.data
  })
}

export const sendContact = async (data) => {
  return axios({
    method: 'POST',
    url: `${API_SOMSOLET_URL}contact/`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((response) => {
    return response
  })
}

export const sendIncidence = async (data) => {
  return axios({
    method: 'POST',
    url: `${API_SOMSOLET_URL}incidence/`,
    headers: {
      Authorization: `Basic ${token}`,
    },
  }).then((response) => {
    return response
  })
}
