import axios from 'axios'

// const { API_SOMSOLET_URL, SOMSOLET_API_USERNAME, SOMSOLET_API_PASSWORD } =
const API_SOMSOLET_URL = 'https://somsolet-demo.somenergia.lan/somsolet-api/'

const getToken = () => {
  return ""
}

const token = getToken()

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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response
  })
}
