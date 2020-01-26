const db = require('./db')
const { getBook, excerptMaker } = require('./server/helpers.js');
const { Book, Excerpt } = require('./db/models/')

const seed = async () => {
  await db.sync({force: true})

  const books = await Promise.all([
		Book.create({ title: 'Little Women', author: 'Louisa May Alcott' })
	]);

const addExcerpt = [];
excerptMaker(getBook('public/littleWomen.txt')).forEach((excerpt) => {
  addExcerpt.push(Excerpt.create({paragraph: excerpt, bookId: 1}));
})
  const excerpts = await Promise.all(addExcerpt);
}

seed().catch((err) => {
	db.close();q
	console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `);
});