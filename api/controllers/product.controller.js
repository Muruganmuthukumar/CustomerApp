const Product = require("../models/product.model");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            throw new Error("Server Busy");
        }
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById({ _id: id });
        res.status(200).json(product)
        if (!product) {
            throw new Error("Product not found");
        }
    } catch (err) {
        res.json(err.message)
    }
}

const newProduct = async (req, res) => {
    const { title, brand, category, stock, price, thumbnail } = req.body;
    try {
        const product = new Product({ title, brand, category, stock, price, thumbnail })
        const existingProduct = await Product.findOne({ title: title })
        if (existingProduct) {
            throw new Error("Product already exists!")
        }
        await product.save();
        res.status(201).json(product);
    } catch (err) { 
        res.status(500).json(err.message);
    }
}

const editProduct = async (req, res) => {
    console.log(req.params.id)
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
            // console.log(JSON.stringify(updatedProduct))
        } else {
            res.status(404).json('Product not found');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (deletedProduct) {
            res.json({ message: 'Product Deleted Successfully' });
        } else {
            res.status(404).json('Product not found');
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
module.exports = {
    getAllProducts,
    getProduct,
    newProduct,
    editProduct,
    deleteProduct
}