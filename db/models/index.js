const Excerpt = require('./excerpt')
const Book = require('./books')

Excerpt.belongsTo(Book)
Book.hasMany(Excerpt)

module.exports = {
  Excerpt,
  Book,
}
