import chalk from 'chalk'
const tag = '[vite-mock-plugin]'
const clog = console.log
const infoLog = (...args: any[]) => {
  const time = new Date().toLocaleTimeString()
  const msg = args.map((i) => '\n' + chalk.yellow(JSON.stringify(i))).join(' ')
  clog(chalk.green.bold(`[${time}] ${tag} [INFO]`), chalk.yellow(msg))
}
const errorLog = (...args: any[]) => {
  const time = new Date().toLocaleTimeString()
  const msg = args.map((i) => '\n' + chalk.red(JSON.stringify(i))).join(' ')
  clog(chalk.red.bold(`[${time}] ${tag} [ERROR]`), msg)
}

export { infoLog, errorLog }
