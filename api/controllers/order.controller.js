const Order = require("../models/order.model")

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            throw new Error("Server Busy");
        }
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById({ _id: id });
        res.status(200).json(order)
        if (!order) {
            throw new Error("Product not found");
        }
    } catch (err) {
        res.json(err.message)
    }
}

const newOrder = async (req, res) => {
    const { productName, customerName, price, quantity, thumbnail } = req.body;
    const newOrder = new Order({ price, productName, customerName, thumbnail, quantity });
    try {
        await newOrder.save();
        res.status(201).json("Order created successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const editOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Order.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (deletedOrder) {
            res.json({ message: 'Order Deleted Successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllOrders,
    getOrder,
    newOrder,
    editOrder,
    deleteOrder
}