const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const SignUpRouter = require('./routes/signup');
const loginUser = require('./routes/loginUser');
const sequelize = require('./sequelize');
const User = require('./entities/user');
const userRouter = require('./routes/user');
const artistrouter = require('./routes/artistroute');
const trackRouter = require('./routes/trackroute')
const albumRouter = require('./routes/albumroute');
const favRouter = require('./routes/favroute');


const PORT = 5002;
const port2= process.env.PORT || 5000;
require('dotenv').config();



const app = express();

// Sequelize Configuration

// Test SQL Database Connection

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Routes
app.use('/signup', SignUpRouter);
app.use('/login', loginUser);
// const userRouter = require('./routes/user');
// const artistrouter = require('./routes/artistroute');
app.use('/user', userRouter);
app.use('/artists',artistrouter);
app.use('/albums',albumRouter)
app.use('/tracks',trackRouter)
app.use('/favorites',favRouter)
// Start Server
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Sequelize connected to the database successfully.');
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         process.exit(1); // Exit the application if the database connection fails
//     }
// })();
sequelize.authenticate()
.then(() => {
    console.log('Sequelize connected to the database successfully.');
    // app.listen(PORT, () => {
    //     console.log(`Server is running on http://localhost:${PORT}`);
    // });
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
});


app.listen(port2, () => {
        console.log(`Server is running on http://localhost:${port2}`);
    });