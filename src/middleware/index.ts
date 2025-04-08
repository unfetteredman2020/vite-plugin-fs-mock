import chalk from 'chalk';
import { Req, Res, Next } from '../../types';
import { Main } from '../utils/file';
import { infoLog } from '../utils/log';

async function MockRequestMiddleware(options: any) {
  const m = new Main(options)
  await m.init()
  const middleware = (req: Req, res: Res, next: Next) => {
    const url = req.url!
    const links = m.links
    infoLog(chalk.yellow('[ req.url ]'), req.url, links.includes(url));
    if(links.includes(url)) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')
      res.setHeader('Access-Control-Allow-Methods', '*')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.setHeader('Access-Control-Max-Age', '3600')
      res.setHeader('Cache-Control', 'no-cache')
      return res.end?.(m.data[url])
    }
     next?.()
  }
  return middleware
}

export default MockRequestMiddleware
