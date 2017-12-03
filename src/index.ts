import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphql, graphiql } from './graphql';

const app = new koa();
const router = new koaRouter();
const PORT = 8080;

app.use(koaBody());

router.post('/graphql', graphql);
router.get('/graphiql', graphiql);

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);
