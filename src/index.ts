import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphqlKoa } from 'apollo-server-koa';
import schema from './schemas/index.graphql';

const app = new koa();
const router = new koaRouter();
const PORT = 8080;

app.use(koaBody());

router.post('/graphql', graphqlKoa({ schema: schema }));
router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
