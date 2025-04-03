
export const relativePath = (p1: string, p2: string): string => {
  if (p1 === p2) {
    return p2
  }
  const p0 = p1.endsWith('/') ? p1 :  p1 + '/'
  return p2.split(p0).join('')
}