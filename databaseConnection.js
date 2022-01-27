require('dotenv').config()

//const { find } = require('async');
//const { connect } = require('http2');
// MongoDB
const { MongoClient, ConnectionPoolClosedEvent } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.URL;
// const client = new MongoClient(url);

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


let dbConnection;
let products = []

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }
            dbConnection = db.db("supercode");
            //console.log("successfully connected to MongoDB");
            products = dbConnection.collection("the_design_shop")
            // console.log("hallo Test", array)
            products.find().toArray(function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    products = results
                    console.log(products)
                }
            })
            return dbConnection 
        });
    }, 
    getDb: function () {
        return dbConnection
    }
}










// connection to MongoDB Database ("supercode")
/* function connectToDb() {
    if (typeof (db) === 'undefined') {
        client.connect()
            .then((connected_client) => {
                db = connected_client.db("supercode")
                console.log("TEST TEST TEST TEST TEST")
            })
    }
} */

/* function getCollectionArticles() {
    return db.collection("the_design_shop")
        .find()
        .toArray()
} */


// Database Name
const dbName = 'myProject';


