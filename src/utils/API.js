import axios from 'axios';

const baseUrl = 'http://localhost:5001/initech-launch-system/us-central1/server/api/products/all';

export default {
  testAPI: () => {
    return axios.get(`${baseUrl}/`)
  }
}