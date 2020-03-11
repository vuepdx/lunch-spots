import axios from 'axios'

export const yelp = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/',
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_YELP_KEY}`,
  },
})

export const openStreetMap = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/',
})

export const http = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/',
})

export default http
