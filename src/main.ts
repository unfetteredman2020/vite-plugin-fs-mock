import middleware from './middleware/index'
import { Plugin, ResolvedConfig } from 'vite'
import { Options, MockFileExtEnum  } from '../types/index'
export * from '../types/index'

export const viteMockPlugin = (options: Options = { path: 'mock',  ext: MockFileExtEnum.JSON }): Plugin => {
  return {
    name: 'vite-mock-plugin',
    configResolved(_: ResolvedConfig) {
      // console.log('config :>> ', config);
    },
    async configureServer({ middlewares }) {
      const mockMiddleware = await middleware(options)
      middlewares.use(mockMiddleware)
    }
  }
}
