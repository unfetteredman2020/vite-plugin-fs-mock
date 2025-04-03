import { Req, Res, Next } from '../../types/index.d';
import { Main } from '../utils/file';

async function MockRequestMiddleware(options: any) {
  const m = new Main(options)
  const middleware = (req: Req, res: Res, next: Next) => {
    console.log('res :>> ', res.closed);
    console.log('req.url :>> ', req.url);
    console.log('options :>> ', options);
    const url = req.url
    if(m.data[url!]) {
      res.end(m.data[url!])
    }
     next?.()
  }
  
  return middleware
}

export default MockRequestMiddleware
