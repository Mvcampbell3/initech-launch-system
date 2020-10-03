const router = require('express').Router();
const api_routes = require('./api');

router.get('/', (req, res) => {
  console.log('request rec in routes folder')
  res.json('Hello There')
})

router.use('/api', api_routes);

module.exports = router;