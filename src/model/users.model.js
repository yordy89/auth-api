const { UserSchema } = require('@buychain/schema')
const mongoose = require('mongoose')

class UsersModel {
  /**
   * @param {string} username
   * @returns {Promise<Object>}
   * @description Get user by username.
   */
  static getUserByUsername (username) {
    const _username = username?.toLocaleLowerCase()

    const conditions = { username: _username }

    return UsersModel._model.findOne(conditions)
  }
}

UsersModel._model = mongoose.model('Users', UserSchema)

module.exports = UsersModel
