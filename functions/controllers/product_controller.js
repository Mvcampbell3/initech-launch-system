// Bring in stripe and firebase database api's
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();
const functions = require('firebase-functions');
// Will bring in stripe after process.env set on firebase functions
const stripe = require('stripe')(functions.config().stripe.key);

module.exports = {
  getProductsTest: function(req, res) {
    // res.json({ ok: true, path: '/api/products/all' })
    stripe.products.list()
      .then((products) => {
        res.json({ ok: true, products, path: '/api/products/all' })
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: false, err })
      })
  },
  createProductFirebase: function(req, res) {
    const db_ref = db.ref('products');
    const { description, name, price, mission_type, flight_profile, product_type, img_path } = req.body.product;
    db_ref.push({ description, name, price, mission_type, flight_profile, product_type, img_path })
      .then((result) => {
        res.json({ ok: true })
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: false, err })
      })
  }
}