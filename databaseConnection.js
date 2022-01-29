// Dotenv
require('dotenv').config()
// MongoDB
const { MongoClient } = require('mongodb');
// Connection URL
const url = process.env.URL;
// const client = new MongoClient(url);

let _db; // Design Pattern = Singleton

function _getDatabase() { // "resolve", "reject"
    return new Promise((resolveDB, rejectWithErr) => {
        if (_db) {
            resolveDB(_db);
            // Database Verbindung besteht bereits, d.h. es kann direkt vom Promise oben resolved werden, keine neue Verbindung muss aufgebaut werden. 
        } else {
            const url = process.env.URL;
            const client = new MongoClient(url)

            client
                .connect()
                .then((connected_client) => {
                    _db = connected_client.db("supercode");
                    resolveDB(_db)
                })
                .catch((err) => rejectWithErr(err))
        }
    })
}

function getAllProducts() {
    return _getDatabase()
        .then((db) => {
            const databasePromiseAllProducts = db.collection("the_design_shop")
                .find() // kein query, weil alle produkte ausgegeben werden sollen
                .toArray() // turn FindCursso in ein Array, um Daten zu erhalten

            return databasePromiseAllProducts
        })
}

function createNewProduct(product) {
    return _getDatabase()
        .then((db) => {
            return db.collection("the_design_shop")
                .insertOne(product)
        })
}

function randomProduct(product) {
    return _getDatabase()
        .then((db) => {
            const databasePromiseRandomProducts = db.collection("the_design_shop")
                .aggregate(
                    [{ $sample: { size: 6 } }]
                ) // 6 random products
                .toArray() // turn FindCursso in ein Array, um Daten zu erhalten

            return databasePromiseRandomProducts
        })
}

module.exports = {
    getAllProducts,
    _getDatabase,
    createNewProduct,
    randomProduct
}








/* const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); */

/* let dbConnection;
let products = [] */

/* module.exports = {
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
                    // console.log(products)
                }
            })
            return dbConnection
        });
    },
    getDb: function () {
        return dbConnection
    }
}
 */









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
/* const dbName = 'myProject'; */


