const Koa = require('koa');
const server = new Koa();
const logger = require('koa-morgan');
const Router = require('koa-router');
const bodyParser = require('koa-body')();

const router = new Router();

router.get('/', ctx => {
    ctx.body = 'I am  root!'
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