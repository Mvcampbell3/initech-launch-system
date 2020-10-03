const router = require('express').Router();
const products_routes = require('./products');

router.get('/', (req, res) => {
  res.json({ ok: true, path: '/api' })
})

router.use('/products', products_routes);

module.exports = router;