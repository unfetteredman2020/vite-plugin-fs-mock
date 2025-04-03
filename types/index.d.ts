export {}

import Chokidar, { watch, FSWatcher} from 'chokidar';
import { ViteDevServer} from 'vite';

export interface Options {
  path: string | string[]
  ChokidarOptions?: Chokidar.WatchOptions
}

export type Req = Parameters<ViteDevServer['middlewares']>[0]
export type Res = Parameters<ViteDevServer['middlewares']>[1]
export type Next = Parameters<ViteDevServer['middlewares']>[2]
