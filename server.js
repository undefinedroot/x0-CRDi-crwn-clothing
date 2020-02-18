const express = require('express');
const cors = require('cors'); // cross origin resource sharing
const bodyParser = require('body-parser');
const path = require('path'); // native module for nodejs
const compression = require('compression');

const PRODUCTION = 'production';
const CLIENT_PATH = 'client/build'

// load to process, we are hiding our STRIPE_SECRET_KEY at .env,
// in production, we will be retrieving that variable on the server
if (process.env.NODE_ENV !== PRODUCTION) require('dotenv').config();

// important: code below need to be done after the line above!
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //immediately invoke

const app = express();

// be sure to use on client's package.json:     "proxy": "http://localhost:5000"
const PORT = process.env.PORT || 5000; // localhost host 3000 (for react)

app.use(compression()); // enable gzip
app.use(bodyParser.json()); // parse as .json()
app.use(bodyParser.urlencoded({ extended: true })); // url-strings are parsed

// app.use(express.json());         //should use these instead of body-parser
// app.use(express.urlencoded());    //should use these instead of body-parser

// checks to make sure that the origin is the same,
// so that only the one that is allowed to access this API
// is the react client which is hosted on the same machine
app.use(cors());

if (process.env.NODE_ENV === PRODUCTION) {
  // allows us to serve the static files from /client/build
  app.use(express.static(path.join(__dirname, CLIENT_PATH)));

  // any URL that the user hits due to wildcard '*'
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, CLIENT_PATH, 'index.html'));
  });

}

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  // 1st argument: the body object
  // 2nd argument: callback function, called after the request
  stripe.charges.create(body, (stripeError, stripeResponse) => {
    if (stripeError) return res.status(500).send({ error: stripeError });
    return res.status(200).send({ success: stripeResponse });
  });
});

app.listen(PORT, error => {
  if (error) throw error;
  console.log(`========= server running on port ${PORT}. =========`);
});

