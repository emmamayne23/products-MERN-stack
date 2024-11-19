import Product from "../models/product.model.js"
import mongoose from "mongoose"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        })
    } catch (error) {
        console.error('Error in getting products:' + error.message)
        res.status(500).json({
            success: false,
            message: "Server error"})
    }
}

export const createProduct = async (req, res) => {
    const product = req.body // req.body is an object that contains the data sent from the client to the server. It is used to send data from the client to the server.

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }

    const newProduct = new Product(product) // product is used to save data from the client to the server.
    
    try {
        await newProduct.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct})
        
    } catch (error) {
        console.error('Error in creating product:' + error.message)
        res.status(500).json({
            success: false,
            message: "Server error"})
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })        
    } catch (error) {
        console.error('Error in deleting product:' + error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true
        })
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.error('Error in updating product:' + error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}