const Koa = require('koa');
const server = new Koa();

server
    .use(ctx => {
    ctx.body = 'I am your first Koa API!'
})
    .listen(2020)