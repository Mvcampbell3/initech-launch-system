const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('request rec in routes folder')
  res.json('Hello There')
})

module.exports = router;