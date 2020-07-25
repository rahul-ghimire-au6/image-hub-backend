const sequelize = require("../helper/db_setting")
const { Sequelize, Model } = require("sequelize")


class User extends Model {}

User.init({
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    token: {
        type: Sequelize.TEXT
    },
    createdat: {type:Sequelize.DATE}, 
    updatedat: {type:Sequelize.DATE},
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'users' // We need to choose the model name
  });
console.log(User === sequelize.models.users);

module.exports=User