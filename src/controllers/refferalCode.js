const bcrypt = require('bcryptjs')
const response = require('../helpers/responseStandard')
const { User } = require('../models')
const joi = require('joi')
const { Op } = require('sequelize')

module.exports = {
  inputReffCode: async (req, res) => {
    const schema = joi.object({
        refferall_code: joi.string().min(6).max(6).required()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return response(res, 'Error', { error: error.message }, 400, false)
    } else {
      try {
        let { refferall_code } = results
        const check = await User.findOne({
            where: {
                refferall_code: refferall_code
            }
        })
        if (check) {
            const { name } = check.dataValues
          return response(res, `Refferall Code is valid from user ${name}`, {}, 200, true)
        }
          return response(res, 'Refferall Code is not found', {}, 404, false)
        } catch (e) {
          return response(res, e.message, {}, 500, false)
        }
    }
  }
}
