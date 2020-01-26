const Koa = require('koa');
const cors = require('@koa/cors');
const server = new Koa();
const axios = require('axios');
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const { 
    excerptMaker, 
    getStopWords, 
    cleanStopWords, 
    getBook, 
    chooseExcerpt,
    chooseWords,
    } = require('./helpers');

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = excerptMaker(getBook('public/littleWomen.txt'));
 // ctx.body = axios.get('http://spacejam.com').then((response) => {
    //     return response.config
    // })

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
    .use(cors())
    .use(router.routes())
    .listen(2020);

module.exports = server;