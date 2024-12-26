// const express = require('express');
// const user = require('../controller/user');
// //const signup = require('../controller/user');
// const router = express.Router();

// router.post('/',user);

// module.exports = router;


// routes/user.js
//const express = require('express');
//const { addUser } = require('../controller/user'); // Extract the function you want to use
//const router = express.Router();

// Pass the specific function as a callback
// const express = require('express');
// const addUser  = require('../controller/user');
// const deleteUser = require('../controller/user');
// const getUsers= require('../controller/user');

// // User controllers
// const authMiddleware = require('../middleware/authMiddleware'); // Import middleware
// const router = express.Router();
// //router.post('/', addUser); 

// // Routes
// router.get('/', authMiddleware(['admin']), getUsers); // Admin can get all users
// router.post('/add-user', authMiddleware(['admin']), addUser); // Admin can add a user
// router.delete('/:id', authMiddleware(['admin']), deleteUser); // Admin can delete a user

// //module.exports = router;


// module.exports = router;
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUsers, addUser, deleteUser, updatePassword } = require('../controller/user');

// Admin can get all users
router.get('/', authMiddleware(['Admin']), getUsers);

// Admin can add a user
router.post('/add-user', authMiddleware(['Admin']), addUser);

// Admin can delete a user
router.delete('/:id', authMiddleware(['Admin']), deleteUser);

router.patch('/update-password',authMiddleware(['Editor']),updatePassword);

module.exports = router;
