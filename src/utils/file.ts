import * as chokidar from 'chokidar';
import type { FSWatcher } from 'chokidar';
import { Options } from '../../types';
import { infoLog, errorLog } from './log';
import glob from 'fast-glob';
import { readFile } from 'node:fs/promises';
import { relativePath } from './pathUtils';
import path from 'path';
const root = process.cwd();

export class Main {
  options: Options;
  watcher: FSWatcher | undefined;
  _data: Record<string, any> = {}
  constructor(options: Options) {
    infoLog('options :>> ', options, [3, 9, {a: 33, b: 44}]);
    this.options = options;
    this.watch = this.watch.bind(this);
    this.init = this.init.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.init();
    this.makeList();

  }
  get data() {
    return this._data;
  }
  init() {
    this.watch();
  }
  watch() {
    console.log('watch is running:>> ');
    const watcher = chokidar.watch(this.options.path, {
      ignoreInitial: true,
      ...this.options.ChokidarOptions
    })
    watcher.on('all', this.handleChange)
  }
  async handleChange(event: string, p: string) {
    infoLog('文件发生改变',event, p);
    const k = relativePath(root, p)
    const data = await this.readFile(p);
    this._data[k] = data;
  }
  async makeList() {
    const dirs = glob.sync(this.options.path + '/**/*.ts', { absolute: false})
    console.log('dirs :>> ', dirs);
    // for循环异步遍历获取文件内容
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const data = await this.readFile(dirs[i]);
     this._data[dir] = data
    }
  }
  async _readPath(p: string) {
    const parse = path.parse(p)
    return path.join(parse.dir, parse.name)
  }
  async readFile(path: string) {
    const data = await readFile(path, { encoding: 'utf-8'});
    return data;
  }
}
