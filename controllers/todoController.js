const { Todo } = require('../models')

class TodoController {
  static findAllTodo(req,res,next){
    const UserId = req.loggedUser.id
    Todo.findAll({where:{UserId}})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  
  static findOneTodo(req,res,next){
    const {id} = req.params // ToDo id
    const UserId = req.loggedUser.id
    Todo.findOne({where:{id, UserId}})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          throw {message:"Data not found", status: 404}
        }
      })
      .catch(next)
  }

  static createTodo(req,res,next){
    const UserId = req.loggedUser.id
    const {title,description} = req.body
    Todo.create({title,description,UserId})
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }

  static updateAllData(req,res,next){
    const {id} = req.params
    const {title,description} = req.body
    Todo.update({title,description},{where:{id}})
      .then(data => {
        if(data[0] !== 0){
          res.status(200).json({message:"Data Successfuly Updated"})
        }
        else{
          res.status(200).json({message:"No Data Updated"})
        }
      })
      .catch(next)
  }

  static updateTitle(req,res,next){
    const {id} = req.params
    const {title} = req.body
    Todo.update({title}, {where:{id}})
      .then(data => {
        if(data[0] !== 0){
          res.status(200).json({message:"Data Successfuly Updated"})
        }
        else{
          res.status(200).json({message:"No Data Updated"})
        }
      })
      .catch(next)
  }

  static deleteTodo(req,res,next){
    const {id} = req.params // todo ID
    Todo.destroy({where:{id}})
      .then(data => {
        res.status(200).json({message:"Data Successfuly Deleted"})
      })
      .catch(next)
  }
}

module.exports = TodoController