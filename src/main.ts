import { Plugin, ResolvedConfig } from 'vite'
import middleware from './middleware/index'

export const viteMockPlugin = (options: any): Plugin => {
  console.log('options :>> ', options)
  return {
    name: 'vite-mock-plugin',
    configResolved(config: ResolvedConfig) {
      // console.log('config :>> ', config);
    },
    async configureServer({ middlewares }) {
      // server.middlewares.use(mockMiddleware(options))
      const mockMiddleware = await middleware(options)
      middlewares.use(mockMiddleware)
    }
  }
}
