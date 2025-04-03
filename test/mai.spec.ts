import { expect, test} from 'vitest';
import path from 'path';
import { relativePath } from '../src/utils/pathUtils';

// import { Main } from '../src/utils/file';


// test('viteMockPlugin', () => {
  // const viteMockPlugin = new Main({path: '../mock/'});
  // expect(viteMockPlugin).toBeDefined();
  // expect(viteMockPlugin).toBeInstanceOf(Function);
// })

const p = '/Users/duibagroup/project/mine/vite-mock-plugin';
const p2 = '/Users/duibagroup/project/mine/vite-mock-plugin/mock/test.ts';


console.log('object :>> ',path.basename(p));
console.log('object :>> ',path.dirname(p));

const parse = path.parse(p)

const real = path.join(parse.dir, parse.name)

console.log('real :>> ', real);

console.log('333 :>> ', relativePath(p , p2));