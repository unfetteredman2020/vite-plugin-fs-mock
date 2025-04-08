# vite-plugin-fs-mock

> vite plugin for mock file, support `.json` and `.js` `.ts` file .

## install

```bash
npm i vite-plugin-fs-mock -D
```

```bash
yarn add vite-plugin-fs-mock -D
```

## Options

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| path | string or string[] | - | mock file path |
| ext | MockFileExtEnum | json | mock file ext |
| ChokidarOptions | Chokidar.WatchOptions | - | Chokidar options |

### [Chokidar.WatchOptions](https://www.npmjs.com/package/chokidar/v/3.6.0)

### MockFileExtEnum

```ts
export enum MockFileExtEnum {
  JS = 'js',
  TS = 'ts',
  JSON = 'json',
  JSX = 'jsx',
}
```

## usage

```js
import { defineConfig } from 'vite'
import fsMock from 'vite-plugin-fs-mock'
import path from 'path'

export default defineConfig({
  plugins: [
    fsMock({
      // mock file path
      path: path.resolve(__dirname, 'mock'),
      // mock file suffix
      ext: 'json',
    }),
  ],
})
```

## config

```js
fsMock({
  // mock file path
  path: path.resolve(__dirname, 'mock'),
  // mock file suffix
  ext: 'json',
})
```

## example

```js
// mock/user.json
{
  "name": "vite-plugin-fs-mock"
}
```

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$http = axios

app.mount('#app')
```

```js
// src/App.vue
<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: '',
    }
  },
  mounted() {
    this.$http.get('/user').then((res) => {
      this.name = res.data.name
    })
  },
}
</script>
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import fsMock from 'vite-plugin-fs-mock'
import path from 'path'

export default defineConfig({
  plugins: [
    fsMock({
      // mock file path
      path: path.resolve(__dirname, 'mock'),
      // mock file suffix
      ext: 'json',
    }),
  ],
})
```

## LICENSE

MIT
