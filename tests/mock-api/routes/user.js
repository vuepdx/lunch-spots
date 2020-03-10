const Users = require('../resources/user')

module.exports = (app) => {
  app.get('/api/users/location', (request, response) => {
    return Users
  })
}
