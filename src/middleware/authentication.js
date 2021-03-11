const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/responseStandard')
const secretKey = 'BACKEND_SECRET_KEY'

module.exports = {
  authUser: (req, res, next) => {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const payload = jwt.verify(token, secretKey)
        if (payload) {
          req.user = payload
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  },
}
