function errorHandler(err,req,res,next){
  console.log(err.name)

  let message = err.message || "Internal Server Error"
  let status = err.status || 500

  if(err.message.name === 'JsonWebTokenError'){
    res.status(status).json({message: err.message.message})
  }
  else if(err.name === "SequelizeValidationError"){
    res.status(400).json({message})
  }
  else{
    res.status(status).json({message})
  }
}

module.exports = errorHandler