import axios from 'axios'

const {
  REACT_APP_API_SOMSOLET_URL,
  REACT_APP_SOMSOLET_API_USERNAME,
  REACT_APP_SOMSOLET_API_PASSWORD,
} = process.env

const getToken = async () => {
  return axios({
    method: 'POST',
    url: `${REACT_APP_API_SOMSOLET_URL}api/token/`,
    data: {
      username: REACT_APP_SOMSOLET_API_USERNAME,
      password: REACT_APP_SOMSOLET_API_PASSWORD,
    },
  }).then((response) => {
    return response?.data?.access
  })
}

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
  const token = await getToken()
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_SOMSOLET_URL}stages/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response?.data
  })
}

export const getCampaign = async (data) => {
  const token = await getToken()
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_SOMSOLET_URL}campaign/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response?.data
  })
}

export const getProject = async (data) => {
  const token = await getToken()
  return axios({
    method: 'GET',
    url: `${REACT_APP_API_SOMSOLET_URL}project/`,
    headers: {
      Authorization: `Bearer ${token}`,
      dni: data.dni,
    },
  }).then((response) => {
    return response?.data
  })
}

export const sendContact = async (data) => {
  const token = await getToken()
  return axios({
    method: 'POST',
    url: `${REACT_APP_API_SOMSOLET_URL}contact/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response
  })
}

export const sendIncidence = async (data) => {
  const token = await getToken()
  return axios({
    method: 'POST',
    url: `${REACT_APP_API_SOMSOLET_URL}incidence/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response
  })
}
