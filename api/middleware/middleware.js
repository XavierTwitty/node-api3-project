const User = require('../users/users-model')


function logger(req, res, next) {
  console.log(`${req.method} request`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const {id} = req.params
    const user = await User.getById(id)
  
    if (!user) {
      res.status(404).json({message: " user not found "})
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next()
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger, 
  validateUser,
  validateUserId, 
  validatePost,
}