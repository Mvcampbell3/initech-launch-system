import axios from 'axios';

const baseUrl = 'http://localhost:5001/initech-launch-system/us-central1/server/api';

export default {
  testAPI: () => {
    return axios.get(`${baseUrl}/`)
  },
  createProductFirebase: (product) => {
    return axios.post(`${baseUrl}/products/new`, { product })
  }
}