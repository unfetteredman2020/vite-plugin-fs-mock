import * as chokidar from 'chokidar'
import type { FSWatcher } from 'chokidar'
import { type Options, FSEvents } from '../../types/index'
import { infoLog, errorLog } from './log'
import glob from 'fast-glob'
// import { readFile } from 'node:fs/promises'
import { relativePath } from './pathUtils'
import path from 'path'
import { bundleRequire, JS_EXT_RE } from 'bundle-require'
const root = process.cwd()

export class Main {
  options: Options
  watcher: FSWatcher | undefined
  _data: Record<string, any> = {}
  constructor(options: Options) {
    infoLog('[ Main Constructor Is Executed ] \n', '[ Init Options ]', options)
    this.options = options
    this.watch = this.watch.bind(this)
    this.init = this.init.bind(this)
    this.makeList = this.makeList.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  get data() {
    return this._data
  }
  get links() {
    return Object.keys(this._data)
  }
  async init() {
    await this.makeList()
    await this.watch()
  }
  watch() {
    const watcher = chokidar.watch(this.options.path, {
      ignoreInitial: true,
      ...this.options.ChokidarOptions
    })
    watcher.on('all', this.handleChange)
  }
  async handleChange(event: FSEvents, p: string) {
    try {
      infoLog('[ file or directory changed ]: ', event, p)
      const k = relativePath(root, p)
      if (event === FSEvents.ADD_DIR) {
        this._data[k] = {}
      }
      if (event === FSEvents.UNLINK_DIR) {
        delete this._data[k]
      }
      if (event === FSEvents.UNLINK) {
        delete this._data[k]
      }
      if (event === FSEvents.CHANGE) {
        const data = await this.readFileAsync(p)
        this._data[k] = data
      }
    } catch (error) {
      errorLog('文件发生改变 error :>> ', error)
    }
  }
  async makeList() {
    const dirs = await glob(`${this.options.path}/**/*${this.options.ext}`)
    console.log('dirs :>> ', dirs)
    // for循环异步遍历获取文件内容
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i]
      const k = relativePath(root, dir)
      const data = await this.readFileAsync(dirs[i])
      this._data[k] = data
    }
  }
  async _readPath(p: string) {
    const parse = path.parse(p)
    return path.join(parse.dir, parse.name)
  }
  getOutputFile(filepath: string, format: 'esm' | 'cjs') {
    // const dirname = path.dirname(filepath)
    const basename = path.basename(filepath)
    const random_name = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    return path.resolve(process.cwd(), 'node_modules', '.cache', `_${basename.replace(JS_EXT_RE, `.bundled_${random_name}.${format === 'esm' ? 'mjs' : 'cjs'}`)}`)
  }

  async readFileAsync(p: string) {
    const parse = path.parse(p)
    const ext = parse.ext
    console.log('ext :>> ', ext)
    if (ext !== `.${this.options.ext}`) {
      return null
    }
    // const data = await readFile(p, { encoding: 'utf-8' })
    const data = (await bundleRequire({ filepath: p, getOutputFile: this.getOutputFile })).mod.default
    console.log('data :>> ', data)
    return JSON.stringify(data)
  }
}
