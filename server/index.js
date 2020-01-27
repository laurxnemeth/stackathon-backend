const Koa = require('koa');
const cors = require('@koa/cors');
const server = new Koa();
const axios = require('axios');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const key = require('../secrets.js');
const Excerpt = require('../db/models/excerpt')
const Sequelize = require('sequelize');

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

const example =
	'Christmas won\'t be Christmas without any presents," grumbled Jo, lying on the rug. "It\'s so dreadful to be poor!" sighed Meg, looking down at her old dress. "I don\'t think it\'s fair for some girls to have plenty of pretty things, and other girls nothing at all," added little Amy, with an injured sniff. "We\'ve got Father and Mother, and each other," said Beth contentedly from her corner." The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, "We haven\'t got Father, and shall not have him for a long time."';

router.get('/api/madlibs', async (ctx) => {
	try {
		let book = await Excerpt.findAll({
			where: {
				bookId: 1
			}
		});

		let excerptObj = chooseExcerpt(book);
		let excerpt = excerptObj.dataValues.paragraph

		let wordsToCheck = chooseWords(cleanStopWords(example, getStopWords()));

		//build dictionary with words and their types
		//its inside the helpers 

		// console.log("dictionary --->", wordsDict)
		let dict = await buildDict(wordsToCheck);
		console.log("dict ---->", dict);

		//time to generate the actual game
		let gameData = {
				//add what type of word and their quantity
				wordType: {},
				//substitute the words in the text for the type and their index
				excerpt: {}
			};

        // for(let key in wordsDict){
        //     if(wordsDict[key] !== undefined || !wordsDict[key].includes("pronoun")){

        //     }
        // }
		//{ “wordType” : {“nouns” : 2, “adverbs”: 3, “verbs”: 4},
		//“excerpt” : “ the $NOUN1 went $ADVERB1 to the $NOUN2”}
        ctx.body = "hey"

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
	.listen(2020);

module.exports = server;
