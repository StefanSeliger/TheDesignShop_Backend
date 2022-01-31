const express = require('express');
const formidable = require('formidable');
const { get } = require('http');
const {
    getAllProducts,
    createNewProduct,
    randomProduct,
} = require("./databaseConnection.js")
require('dotenv').config()
const app = express();
const PORT = process.env.PORT 

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

// use res.render to load up an ejs view file

// console.log("line 17", getAllProducts())


// index page
app.get('/', function (req, res) {
    const allProductsPromise = getAllProducts();

    allProductsPromise
        .then((productArray) => {
            console.log("line 26 ", productArray)
            res.render('pages/main', { productArray });
        })
        .catch((err) => {
            console.log("promise wurde zwar eingehalten, aber ein fehler ist entstanden:", err)
        })
        .finally(() => {
            console.log("egal ob die promise resolved (.then), oder rejected (.catch) wird, das finally wird immer danach ausgeführt...")
        })
    console.log("line 36 ", allProductsPromise)
});

app.get("/add_products", (req, res) => {
    const randomProductsPromise = randomProduct();

    randomProductsPromise
        .then((randomProductArray) => {
            console.log("line 45 ", randomProductArray)
            res.render("pages/addProduct", { randomProductArray })
        })
        .catch((err) => {
            console.log("promise wurde zwar eingehalten, aber ein fehler ist entstanden:", err)
        })
        .finally(() => {
            console.log("egal ob die promise resolved (.then), oder rejected (.catch) wird, das finally wird immer danach ausgeführt...")
        })

        console.log("line 55 ", randomProductsPromise)
})

app.post("/add_products_page", (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields) => {
        if (err) {
            next(err);
            return;
        }
        const newProduct = {
            ProductName: fields.productName,
            Company: fields.productCompany,
            Price: fields.productPrice,
            ProductLink: fields.productPic,
            LinkShop: fields.productLink,
            ProductText: fields.productText,
        }
        createNewProduct(newProduct)
            .then(() => {
                res.redirect("/add_products")
            })
        // res.json({fields})
    })
})

app.use((_, res) => {
    res.render("pages/notFound")
})

app.listen(process.env.PORT || 5000, () => console.log('listening on port ' + process.env.PORT))