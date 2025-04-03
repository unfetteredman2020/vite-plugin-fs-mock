import Koa from 'koa';
import middleware from './src/middleware/index';

const app = new Koa();

const mockMiddleWare = await middleware({path: './mock'});

app.use(mockMiddleWare);

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})