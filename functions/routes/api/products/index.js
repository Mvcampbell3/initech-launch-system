const router = require('express').Router();
const products_controller = require('../../../controllers/product_controller');

router.get('/', (req, res) => {
  res.json({ ok: true, path: '/api/products' });
})

router.get('/all', products_controller.getProductsTest);
router.post('/new', products_controller.createProductFirebase)

module.exports = router;