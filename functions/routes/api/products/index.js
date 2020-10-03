const router = require('express').Router();
const products_controller = require('../../../controllers/product_controller');

router.get('/', (req, res) => {
  res.json({ ok: true, path: '/api/products' });
})

router.get('/all', products_controller.getProductsTest)

module.exports = router;