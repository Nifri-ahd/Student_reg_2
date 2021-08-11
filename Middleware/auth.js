// Token for Authentication
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]

  if (!token || token === '') {
    req.isAuth = false
    return next()
  }
  let verifiedToken
  try {
    verifiedToken = jwt.verify(token) 

  } catch (error) {
    req.isAuth = false
    return next()
  }
  if (!verifiedToken) {
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  req.id = verifiedToken.id
  next()
}
