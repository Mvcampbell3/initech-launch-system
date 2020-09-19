const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');

app.options('*', cors())
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(routes);

exports.server = functions.https.onRequest(app);