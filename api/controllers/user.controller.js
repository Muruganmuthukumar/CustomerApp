const User = require("../models/user.model");
const bcrypt = require('bcrypt');


const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            throw new Error("Server Busy");
        }
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById({ _id: id });
        res.status(200).json(user)
        if (!user) {
            throw new Error("User not found");
        }
    } catch (err) {
        res.json(err.message)
    }
}

const createUser = async (req, res) => {
    const { firstname, lastname, email, mobile, membership, photoURL } = req.body;
    try {
        const newUser = new User({ firstname, lastname, email, mobile, membership, photoURL });
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            throw new Error("User already exists!");
        }
        await newUser.save();
        res.status(201).json("User Created Successfully")
    }
    catch (err) {
        res.json(err.message)
    }
}

const editUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        // console.log(updatedUser)
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json('User not found');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (deletedUser) {
            res.json({ message: 'User Deleted Successfully' });
        } else {
            res.status(404).json('User not found');
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}

// const registerUser = async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             throw new Error("Username is already taken");
//         }
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json("User Registered Successfully");
//     }
//     catch (err) {
//         res.status(500).json(err.message);
//         console.log(err);
//     }
// };

// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             throw new Error('User not found');
//         }
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             throw new Error('Incorrect password');
//         }
//         res.status(200).json("User Logged In Successfully")
//     } catch (err) {
//         res.status(500).json(err.message)
//     }
// };

module.exports = {
    getAllUser, getUser, createUser, editUser, deleteUser
};
