const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const assert = require('assert');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa')
const PORT = process.env.PORT || 5000;

const app = new express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drinkandrate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>  {
  console.log("Mongoose is connected!")
})

const authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ["RS256"]
});

app.get('/drinks', authorizeAccessToken, (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    dbName.collection("drinks").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.get('/peoplenames', authorizeAccessToken, (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    dbName.collection("peoplenames").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.get('/drinktypes', authorizeAccessToken, (req, res) => {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    const dbName = db.db("drinkandrate");
    dbName.collection("drinktypes").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../fe/build'))
}

app.listen(PORT, () => console.log("Server running on port 5000!"))
