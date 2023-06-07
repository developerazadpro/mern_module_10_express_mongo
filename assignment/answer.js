/*
Task 1: Mongoose Schema and Model

Create a Mongoose schema and model for a "Product" collection with the following fields:
name (String)
price (Number)
description (String)
createdAt (Date)
*/

/*-------------------ans of Task 1-----------------*/
const mongoose = require("mongoose")
const ProductSchema = mongoose.schema(
    {
        name:{
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },{ timestamps: true, versionKey: false }
)

const ProductsModel = mongoose.model('product', ProductSchema)
module.exports = ProductsModel


/*
Task 2: Express.js Route

Create an Express.js route that handles a GET request to '/products' and returns a JSON response
containing all products from the Mongoose "Product" collection. Ensure that the response includes
only the name and price fields for each product.

*/


/*-------------------ans of Task 2-----------------*/
// productRouter.js
const express = require("express")
const router = express.Router()
const ProductsController = require("../controllers/ProductsController") // assuming product controller

router.get('/products', ProductsController.getAllProduct)

module.exports = router;

// ProductsController.js
const ProductsModel = require("../models/ProductsModel") // assuming product model
exports.getAllProduct = async (req, res) => {
    try {
        const products = await ProductsModel.find({}, 'name price'); // Fetching only the name and price fields

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}


/*Task 3: JSON Web Tokens (JWT)

Write a function called generateToken that generates a JWT token using the 'jsonwebtoken' library.
The function should accept a user ID and a secret key as parameters and return the generated token.
*/

/*-------------------ans of Task 3-----------------*/
const jwt = require("jsonwebtoken")

// create token
exports.generateToken = (userId, secretKey) => {
    const payload = { userId }
    const options = {  expiresIn: "1h" }
    const token = jwt.sign(payload, secretKey, options)
    return token
}

/*Task 4: Express.js Middleware

Create an Express.js middleware function called authenticate that verifies the JWT token in the request headers
using the 'jsonwebtoken' library. If the token is valid, it should call the next middleware function.
Otherwise, it should return a 401 Unauthorized error.
*/

/*-------------------ans of Task 3-----------------*/
const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(401).json({ error: 'Unauthorized' })
        }else{
            next()
        }
    })
}
module.exports = authenticate