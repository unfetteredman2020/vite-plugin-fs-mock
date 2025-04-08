import path from 'path'
export const relativePath = (p1: string, p2: string): string => {
  if (p1 === p2) {
    return p2
  }
  const p0 = p1.endsWith('/') ? p1 :  p1 + '/'
  const p3 = p2.split(p0).join('')
  const mockPath = p3.split(path.sep).splice(1).join(path.sep)
  const parse = path.parse(mockPath)
  return path.join('/', parse.dir, parse.name)
}