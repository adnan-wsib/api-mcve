
const functions = require('firebase-functions');
const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "eserviceportalbetadb.c4uaygjuwafc.ca-central-1.rds.amazonaws.com",
  user: "wsibinnovation",
  password: "eserviceinnovation",
  database: "eServicePortalBetaDB",
  port: "3306",
});

app.get("*", function(request, response) {

  let responseJSON = {};
  
  connection.query("SELECT * FROM User", function(err, rows, fields) {

    if (!err) {

        responseJSON.error = 0;
        responseJSON.data = rows;
        response.status(200).json(responseJSON);

    } else {

        responseJSON.error = 1;
        responseJSON.data = "No data found";
        responseJSON.errorMessage = err
        response.status(404).json(responseJSON);

    }
  });
});


module.exports.api = functions.https.onRequest(app);

