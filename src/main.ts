import { Plugin, ResolvedConfig } from 'vite'
import middleware from './middleware/index'
import { Options, MockFileExtEnum  } from '../types/index'

export const viteMockPlugin = (options: Options = { path: 'mock',  ext: MockFileExtEnum.JSON }): Plugin => {
  return {
    name: 'vite-mock-plugin',
    configResolved(_: ResolvedConfig) {
      // console.log('config :>> ', config);
    },
    async configureServer({ middlewares }) {
      // server.middlewares.use(mockMiddleware(options))
      const mockMiddleware = await middleware(options)
      middlewares.use(mockMiddleware)
    }
  }
}
