const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

  const Track = sequelize.define('Track', {
    track_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    album_id:{
      type:DataTypes.STRING
    },
    artist_id:{
      type:DataTypes.STRING
    }
  },{
    timestamps:false
  });

  // Track.associate = (models) => {
  //   Track.belongsTo(models.Album, {
  //     foreignKey: 'album_id',
  //     as: 'album',
  //   });
    // Track.belongsTo(models.Artist, {
    //   foreignKey: 'artist_id',
    //   as: 'artist',
    // });
  // };

module.exports=Track
