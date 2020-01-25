const Koa = require('koa');
const server = new Koa();
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const { excerptMaker, getStopWords } = require('./helpers');

const router = new Router();

const example = "Christmas won\'t be Christmas without any presents,\" grumbled Jo, lying on the rug. \"It\'s so dreadful to be poor!\" sighed Meg, looking down at her old dress. \"I don\'t think it\'s fair for some girls to have plenty of pretty things, and other girls nothing at all,\" added little Amy, with an injured sniff. \"We\'ve got Father and Mother, and each other,\" said Beth contentedly from her corner.\" The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, \"We haven\'t got Father, and shall not have him for a long time.\""


router.get('/', ctx => {
    // ctx.body = getStopWords();
    //ctx.body = excerptMaker(textByLine)
    ctx.body = "hello world"
});

router.get('/second_route', ctx => {
    ctx.body = 'I am your recond route'
});

router.post('/something', ctx => {
    ctx.body = {
        something: 'something here'
    }
})

server
    .use(logger('tiny'))
    .use(router.routes())
    .listen(2020);

module.exports = server;