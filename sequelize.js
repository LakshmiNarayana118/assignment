require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,   // Use the environment variable for the database name
    process.env.DB_USER,   // Use the environment variable for the database username
    process.env.DB_PASS,   // Use the environment variable for the database password
    {
        host: process.env.DB_HOST,    // Use the environment variable for the database host
        port: process.env.DB_PORT,    // Use the environment variable for the database port
        dialect: process.env.DB_DIALECT, // Use the environment variable for the database dialect (e.g., mysql)
        logging: false,               // Disable query logging (optional)
        pool: {
            max: 5,                   // Maximum number of connections in the pool
            min: 0,                   // Minimum number of connections in the pool
            acquire: 30000,           // Maximum time (in ms) to acquire a connection before throwing an error
            idle: 10000,              // Maximum time (in ms) a connection can remain idle before being released
        },
    }
);

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error.message));

module.exports = sequelize;
