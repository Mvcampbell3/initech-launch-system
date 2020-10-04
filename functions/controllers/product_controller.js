// Bring in stripe and firebase database api's
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();
// Will bring in stripe after process.env set on firebase functions


module.exports = {
  getProductsTest: function(req, res) {
    res.json({ ok: true, path: '/api/products/all' })
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