import axios from 'axios'

const API_KEY = 'd0729cbe00577f3438ac9c18'
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`

export const API = axios.create({
  baseURL: API_URL,
})
