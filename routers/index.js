const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.get('/', (req,res,next) => {
  res.status(200).json({message:"Connected"})
})

router.use('/api/todos', todoRouter)
router.use('/api/users', userRouter)

module.exports = router