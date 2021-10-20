const {decodeToken} = require('../helpers/jwt')
const { Todo } = require('../models')

function authentication (req,res,next) {
  if(req.headers.authorization){
    let token = req.headers.authorization
    req.loggedUser = decodeToken(token)
    next()
  }
  else{
    res.status(401).json({message: "Invalid Authentication"})
  }
}

function authorization (req,res,next) {
  const UserId = req.loggedUser.id
  const {id} = req.params // ToDo id
  Todo.findOne({where:{id}})
    .then(data => {
      if(!data){
        res.status(404).json({message: "Data Not Found"})
      }
      else if(UserId === data.UserId){
        next()
      }
      else{
        res.status(401).json({message: "Invalid Authorization"})
      }
    })
    .catch(next)
}

module.exports = {
  authorization,
  authentication
}