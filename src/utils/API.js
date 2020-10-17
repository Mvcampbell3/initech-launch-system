import axios from 'axios';

const baseUrl = 'https://us-central1-initech-launch-system.cloudfunctions.net/server';

export default {
  testAPI: () => {
    return axios.get(`${baseUrl}/`)
  },
  createProductFirebase: (product) => {
    return axios.post(`${baseUrl}/products/new`, { product });
  },
  getProducts: () => {
    return axios.get(`${baseUrl}/products/list`);
  }
}