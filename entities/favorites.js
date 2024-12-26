const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize')


  const Favorite = sequelize.define('Favorite', {
    favorite_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category: {
      type: DataTypes.ENUM('artist', 'album', 'track'),
      allowNull: false,
    },
    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id:{
      type:DataTypes.STRING
    }
    
  },{
    timestamps:true
  });

  // Favorite.associate = (models) => {
  //   Favorite.belongsTo(models.User, {
  //     foreignKey: 'user_id',
  //     as: 'user',
  //   });
  //   Favorite.belongsTo(models.Album,{
  //     foreignKey:'item_id',
  //     constraints:false,
  //     as:'artist',
  //   })
  //   Favorite.belongsTo(models.Artist,{
  //     foreignKey:'item_id',
  //     constraints:false,
  //     as:'artist'
  //   })
  //   Favorite.belongsTo(models.Track,{
  //     foreignKey:'item_id',
  //     constraints:false,
  //     as:'track'
  //   })

  // };

 module.exports=Favorite;
