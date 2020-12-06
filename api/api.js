const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const {MongoClient} = require('mongodb');
const assert = require('assert');
const uri = "mongodb+srv://auth0-custom-db-user:eprnsIh9PQQOXoTy@cluster0.uh6ue.mongodb.net/drinkandrate?retryWrites=true&w=majority";

const app = new express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

app.get('/drinks', (req, res) => {
  MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      const dbName = db.db("drinkandrate");
      dbName.collection("drinks").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
});

app.get('/peoplenames', (req, res) => {
  MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      const dbName = db.db("drinkandrate");
      dbName.collection("peoplenames").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
});

app.get('/drinktypes', (req, res) => {
  MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      const dbName = db.db("drinkandrate");
      dbName.collection("drinktypes").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
});

app.listen(5000, () => console.log("Server running on port 5000!"))

// mongoose.connect('mongodb://localhost:27017/drinkdb')

