if (process.env.REACT_APP_ENV === 'production') {
  module.exports = require('./config/prd')
} else {
  module.exports = require('./config/dev')
}
