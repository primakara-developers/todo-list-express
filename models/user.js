'use strict';
module.exports = (sequelize, DataTypes) => {

  const { generateHash } = require('../helpers/bcrypt')
  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Please input valid email"
        },
        isUnique(value, next){
          User.findOne({where:{email:value}})
            .then(data => {
              if(data){
                return next("Email has been used by another user")
              }
              else{
                return next()
              }
            })
            .catch(err => next(err))
        }
      }
    },
    password: DataTypes.STRING
  },{ hooks: {
    beforeCreate: (user) => {
      let pass = generateHash(user.password)
      user.password = pass
    }
  }, sequelize, modelName: 'User' });

  User.associate = function(models) {
    // associations can be defined here
  };
  
  return User;
};