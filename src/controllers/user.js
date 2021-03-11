const bcrypt = require('bcryptjs')
const response = require('../helpers/responseStandard')
const { User } = require('../models')
const joi = require('joi')
const { Op } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  getListUser: async (req, res) => {
    const { search } = req.query
    let searchValue = []
    if (typeof search === 'object') {
      searchValue = Object.values(search)[0]
    } else {
      searchValue = search || ''
    }
    try {
      const results = await User.findAll({
        where: {
          name: { [Op.iLike]: `%${searchValue}%` }
        },
        attributes: {
          exclude: ['password']
        }
      })
      if (results) {
        return response(res, `List of Users`, { results })
      }
      return response(res, 'Users not found', { results }, 404, false)
    } catch (e) {
      return response(res, e.message, {}, 500, false)
    } 
  },
  getDetailProfile: async (req, res) => {
    const { id } = req.user
    try {
      const results = await User.findByPk(id, {
        attributes: {
          exclude: ['password']
        }
      })
      if (results) {
        return response(res, `Detail of user with id ${id}`, { results })
      }
      return response(res, 'User not found', { results }, 404, false)
    } catch (e) {
      return response(res, e.message, {}, 500, false)
    } 
  },
  updateUserProfile: async (req, res) => {
    const { id } = req.user // destruct from token payload
    const schema = joi.object({
      username: joi.string().min(3).max(30),
      password: joi.string().min(6),
      name: joi.string(),
      email: joi.string().email(),
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return response(res, 'Error', { error: error.message }, 400, false)
    } else {
      try {
        let { username, password, name, email } = results
        const check = await User.findByPk(id)
        const checkUserName = await User.findOne({ where: { username: username } })
        const checkEmail =  await User.findOne({ where: { email: email } })
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)
        if (check) {
          if (checkEmail.dataValues.email !== check.dataValues.email) {
            return response(res, 'Email is used, choose another email', {}, 400, false)
          } else {
            if (checkUserName.dataValues.username !== check.dataValues.username) {
              return response(res, 'Username is used, choose another username', {}, 400, false)
            } else {
              if (username && name && email && password) {
                const data = {
                  username,
                  name,
                  email,
                  password,
                }
                await check.update(data)
                return response(res, 'User updated successfully', {})
             } else if (username || name || email) {
               const data = {
                 username,
                 name,
                 email
               }
                await check.update(data)
                return response(res, 'User updated successfully', {})
             } else if (password) {
                 const data = {
                   username,
                   name,
                   email,
                   password
                 }
                 await check.update(data)
                 return response(res, 'User updated successfully', {})
             }
            }
          }
          return response(res, 'Atleast fill one column', {}, 400, false)
        }
          return response(res, 'User not found', {}, 404, false)
        } catch (e) {
          return response(res, e.message, {}, 500, false)
        }
    }
  }
}
