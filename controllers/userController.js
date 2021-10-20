const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { decodeHash, generateHash } = require('../helpers/bcrypt')

class UserController {
  static login (req,res,next) {
    const { email, password } = req.body
    if(req.body.email && req.body.password){
      User.findOne({where:{email}})
        .then(data => {
          if(data && decodeHash(password,data.password)){
            let token = generateToken({ email:data.email, id:data.id })
            res.status(200).json({token})
          }
          else{
            throw { message:"Invalid email or password", status:401 }
          }
        })
        .catch(next)
    }
    else{
      res.status(400).json({message:"Invalid Parameter"})
    }
  }

  static register (req,res,next) {
    const { email,password } = req.body
    if(req.body.email && req.body.password){
    User.create({ email, password })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    }
    else{
      res.status(400).json({message:"Invalid Parameter"})
    }
  }
}

module.exports = UserController