const express = require('express');
const { registerUser, loginUser, getAllUser } = require('../controllers/user.controller');
const router = express.Router();

router.get('/',getAllUser);
// router.get('/:id',getUser);
router.post('/signup',registerUser);
router.post('/signin',loginUser);

module.exports=router;