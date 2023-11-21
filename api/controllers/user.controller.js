const User = require("../models/user.model");
const bcrypt = require('bcrypt');


const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users) 
    }
    catch (err) {
        console.log(err)
    }
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username is already taken");
        }

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User Registered Successfully");
    }
    catch (err) {
        res.status(500).json(err.message);
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Incorrect password');
        }
        res.status(200).json("User Logged In Successfully")
    } catch (err) {
        res.status(500).json(err.message)
    }
};

module.exports = {
    registerUser, loginUser, getAllUser
};
