const functions = require('firebase-functions');

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

// Try running firebase emulators:start in the CLI, you already have the .env file so it might work?

// In order for functions to fun locally, you need to make you have run firebase init in the CLI &&
// after selecting the correct project and setting it up, run firebase emulators:start in the CLI

// After we have all of the backend created and everything, we will deploy the functions to firebase 
// The downside to using them is that they cost money, we shouldn't breach that 200 credit you get every month, but who knows.S
