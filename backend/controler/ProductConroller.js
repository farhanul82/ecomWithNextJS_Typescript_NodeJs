import createError from "http-errors"
import Product from "../models/Product.js"

export const GetAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find({})
        if (products) {
            res.status(200).send(products)
        } else {
            res.send('No products to show')
        }

        // const products = await Product.insertMany(data)
        // res.send({ products })

    } catch (error) {
        createError(error)
    }
}

export const AddProducts = async(req, res, next) => {
    try {
        const addProducts = new Product({...req.body })
        await addProducts.save()
        res.status(200).send("Product added")
    } catch (error) {
        createError(error)
    }
}