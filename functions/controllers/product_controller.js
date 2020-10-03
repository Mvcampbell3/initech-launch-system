// Bring in stripe and firebase database api's
const admin = require('firebase-admin');
admin.initializeApp();

// Will bring in stripe after process.env set on firebase functions


module.exports = {
  getProductsTest: function(req, res) {
    res.json({ ok: true, path: '/api/products/all' })
  }
}