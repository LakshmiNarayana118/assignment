const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");
// const Track = require('../entities/track')

  const Artist = sequelize.define('Artist', {
    artist_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grammy: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,

    },
    
    
  },{
    timestamps:false
  });

  // Artist.associate = (models)=>{
  //   Artist.hasMany(models.Album, {
  //     foreignKey: 'artist_id',
  //     as: 'albums',
  //   });
  // }

  module.exports= Artist;

