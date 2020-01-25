
const db = require('./db')

const seed = async () => {
  await db.sync({force: true})
}

seed().catch((err) => {
	db.close();q
	console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `);
});