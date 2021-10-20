const router = require('express').Router()
const todoController = require('../controllers/todoController')
const {authentication,authorization} = require('../middleware/auth')

router.use(authentication)

router.get('/', todoController.findAllTodo)
router.get('/:id', authorization,todoController.findOneTodo)
router.post('/', todoController.createTodo)

router.put('/:id', authorization, todoController.updateAllData)
router.patch('/title/:id', authorization, todoController.updateTitle)
router.delete('/:id', authorization, todoController.deleteTodo)

module.exports = router