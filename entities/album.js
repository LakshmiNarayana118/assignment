const { DataTypes } = require('sequelize');
const sequelize = require("../sequelize");

  const Album = sequelize.define('Album', {
    album_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    artist_id:{
      type:DataTypes.STRING
    }
  },{
    timestamps:false
  });

  // Album.associate = (models) => {
  //   Album.belongsTo(models.Artist, {
  //     foreignKey: 'artist_id',
  //     as: 'artist',
  //   });
  //   Album.hasMany(models.Track, {
  //     foreignKey: 'album_id',
  //     as: 'tracks',
  //   });
  // };

  module.exports=Album
// const { DataTypes } = require('sequelize');
//{ email:admin$90 , password: odin }

// module.exports = (sequelize) => {
//   const Album = sequelize.define('Album', {
//     album_id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     year: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     hidden: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },{
//     timestamps:false
//   });

//   Album.associate = (models) => {
//     Album.belongsTo(models.Artist, {
//       foreignKey: 'artist_id',
//       as: 'artist',
//     });
//   };

//   return Album;
// };
