const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const response = require('../helpers/responseStandard')
const secretKey = 'BACKEND_SECRET_KEY'
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  login: async (req, res) => {
    const schema = joi.object({
      email: joi.string().required().email(),
      password: joi.string().required(),
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return response(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { email, password } = results
      try {
        const isExist = await User.findOne({ where: { email: email } })
        console.log(isExist.dataValues)
        if (isExist) {
          if (isExist.dataValues.password) {
            await bcrypt.compare(password, isExist.dataValues.password, (err, result) => {
              if (result) {
                const { id } = isExist.dataValues
                jwt.sign({ id: id }, secretKey, { expiresIn: '7d' }, async (err, token) => {
                  // proses penyimpanan user.id di jwt
                client.lpush('tim_bola', 'Persib', redis.print);
                client.lpush('tim_bola', 'Persipura', redis.print);
                client.lpush('tim_bola', 'Arema Cronus', redis.print);
                client.lpush('tim_bola', 'Madura United', redis.print);

                client.lrange('tim_bola', 0, -1, function(err, reply) {
                  console.log(reply.toString()); // Will print `OK`
                });
                  return response(res, 'Login succesfully', { token }, 200, true)
                })
              } else {
                return response(res, 'Wrong email or password', {}, 404, false)
              }
            })
          }
        } else {
          return response(res, 'Wrong email or password', {}, 404, false)
        }
      } catch (e) {
        return response(res, e.message, {}, 500, false)
      }
    }
  },
  signUp: async (req, res) => {
    const schema = joi.object({
      username: joi.string().min(3).max(30).required(),
      password: joi.string().min(6).required(),
      name: joi.string().required(),
      email: joi.string().email().required(),
      refferall_code: joi.string()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return response(res, 'Error', { error: error.message }, 400, false)
    } else {
      let { username, password, name, email, refferall_code } = results
      try {
        password = await bcrypt.hash(password, await bcrypt.genSalt())
        const isExist = await User.findOne({ where: { email: email } })
        if (isExist) {
          return response(res, 'Email has been used', {}, 400, false)
        } else {
          const checkUserName = await User.findOne({ where: { username: username } })
          if (!checkUserName) {
            let reffCode = uuidv4()
            refferall_code = reffCode.slice(0, 6).toUpperCase()
            const data = {
              username,
              password,
              name,
              email,
              refferall_code
            }
            const results = await User.create(data)
            return response(res, 'User created successfully', { results })
          } else {
            return response(res, 'Username has been used', {}, 400, false)
          }
        }
      } catch (e) {
        return response(res, e.message, {}, 500, false)
      }
    }
  },
}
