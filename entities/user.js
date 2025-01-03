const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
      allowNull: false,

    },
    
  },
  {
    timestamps: false,
    tablename: 'users'
  } 
);

module.exports = User;