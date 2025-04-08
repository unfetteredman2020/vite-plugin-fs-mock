import chalk from 'chalk'
const tag = '[vite-plugin-mock]'
const clog = console.log
const infoLog = (...args: any[]) => {
  const time = new Date().toLocaleTimeString()
  clog(chalk.green.bold(`[${time}] ${tag} [INFO]`), ...args)
}
const errorLog = (...args: any[]) => {
  const time = new Date().toLocaleTimeString()
  clog(chalk.red.bold(`[${time}] ${tag} [ERROR]`), ...args)
}

export { infoLog, errorLog }
