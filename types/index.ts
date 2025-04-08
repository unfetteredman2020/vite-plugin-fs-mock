export {}

import Chokidar from 'chokidar';
import { ViteDevServer} from 'vite';

export enum MockFileExtEnum {
  JS = 'js',
  TS = 'ts',
  JSON = 'json',
  JSX = 'jsx',
}

export interface Options {
  path: string | string[],
  ext: MockFileExtEnum;
  ChokidarOptions?: Chokidar.WatchOptions
}

// 'add'|'addDir'|'change'|'unlink'|'unlinkDir'
export enum FSEvents {
  ADD = 'add',
  ADD_DIR = 'addDir',
  CHANGE = 'change',
  UNLINK = 'unlink',
  UNLINK_DIR = 'unlinkDir'
}

export type Req = Parameters<ViteDevServer['middlewares']>[0]
export type Res = Parameters<ViteDevServer['middlewares']>[1]
export type Next = Parameters<ViteDevServer['middlewares']>[2]
