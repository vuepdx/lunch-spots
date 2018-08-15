import axios from 'axios'

export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/',
  headers: {
    'Authorization': `Bearer ${process.env.YELP_KEY}`
  }
})