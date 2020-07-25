const sequelize = require("../helper/db_setting")
const { Sequelize, Model } = require("sequelize")


class Image extends Model {}

Image.init({
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    img_url: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    privacy_status:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    uploaded_by:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    createdat: {type:Sequelize.DATE}, 
    updatedat: {type:Sequelize.DATE},
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'images' // We need to choose the model name
  });
console.log(Image === sequelize.models.images);

module.exports=Image