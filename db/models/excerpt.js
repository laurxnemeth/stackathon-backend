const Sequelize = require('sequelize')
const db = require('../db')

const Excerpt = db.define('excerpt', {
  paragraph: {
    type: Sequelize.TEXT,
  },
})

module.exports = Excerpt
