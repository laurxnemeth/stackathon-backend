const Koa = require('koa');
const cors = require('@koa/cors');
const server = new Koa();
const axios = require('axios');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const key = require('../secrets.js')
const { 
    excerptMaker, 
    getStopWords, 
    cleanStopWords, 
    getBook, 
    chooseExcerpt,
    chooseWords,
    } = require('./helpers');

const router = new Router();

const example =
	'Christmas won\'t be Christmas without any presents," grumbled Jo, lying on the rug. "It\'s so dreadful to be poor!" sighed Meg, looking down at her old dress. "I don\'t think it\'s fair for some girls to have plenty of pretty things, and other girls nothing at all," added little Amy, with an injured sniff. "We\'ve got Father and Mother, and each other," said Beth contentedly from her corner." The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, "We haven\'t got Father, and shall not have him for a long time."';

router.get('/', async (ctx) => {
try {
    //response.data[0].fl = type of the word
    const wordsToCheck = chooseWords(cleanStopWords(example, getStopWords()))

    let gameData = {
        //add what type of word and their quantity
        wordType: {},
        //substitute the words in the text for the type and their index
        excerpt: {}
    } 

    let wordsDict = {}
    wordsToCheck.forEach(async (word) => {
        let response = await axios.get(
			`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`
		);
        wordsDict[word] = response.data[0].fl
        console.log("after: ", wordsDict);
        //find way to ignore pronouns and undefineds
    })

//{ “words” : {“nouns” : 2, “adverbs”: 3, “verbs”: 4},
//“excerpt” : “ the $NOUN1 went $ADVERB1 to the $NOUN2”}
} catch (error) {
    console.log(error);
}
    //format of dictionary api https://dictionaryapi.com/api/v3/references/collegiate/json/river?key=

});

router.post('/something', ctx => {
    ctx.body = {
        something: 'something here'
    }
})

server
    .use(logger('tiny'))
    .use(cors())
    .use(router.routes())
    .listen(2020);

module.exports = server;