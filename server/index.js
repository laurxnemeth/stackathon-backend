const Koa = require('koa');
const cors = require('@koa/cors');
const server = new Koa();
const axios = require('axios');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const key = require('../secrets.js');
const Excerpt = require('../db/models/excerpt');
const Sequelize = require('sequelize');
const port = process.env.PORT || 2020;

const {
	excerptMaker,
	getStopWords,
	cleanStopWords,
	getBook,
	chooseExcerpt,
	chooseWords,
	buildDict
} = require('./helpers');

const router = new Router();

router.get('/api/madlibs', async (ctx) => {
	try {
		//receive book
		let book = await Excerpt.findAll({
			where: {
				bookId: 1
			}
		});

		//randomly choose an excerpt
		let excerptObj = chooseExcerpt(book);

		//grab paragraph from excerpt object
		let excerpt = excerptObj.dataValues.paragraph;

		//clean excerpt of stop words
		//and choose the words for the game
		let wordsToCheck = chooseWords(cleanStopWords(excerpt, getStopWords()));

		//build dictionary (dict[word] = type)
		let dict = await buildDict(wordsToCheck);

		//generate the actual game
		let gameData = {
			//add what type of word and their quantity
			wordType: {},
			//substitute the words in the text for the type and their index
			excerpt: excerpt
		};

		//it's the game!
		const gameExcerpt = (obj) => {
			let str = gameData.excerpt;
			for (let key in obj) {
				if (obj[key] !== undefined && !obj[key].includes('pronoun')) {
					if (gameData.wordType.hasOwnProperty(obj[key])) {
						gameData.wordType[dict[key]]++;
					} else {
						gameData.wordType[dict[key]] = 1;
					}
					str = str.replace(key, obj[key].toUpperCase());
				}
			}
			return str;
		};

		ctx.body = gameExcerpt(dict);
	} catch (error) {
		console.log(error);
	}
});

router.post('/something', (ctx) => {
	ctx.body = {
		something: 'something here'
	};
});

server
	.use(logger('tiny'))
	.use(cors())
	.use(router.routes())
	.listen(port);

module.exports = server;
