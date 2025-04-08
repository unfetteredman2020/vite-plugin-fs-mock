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
const p2 = '/Users/duibagroup/project/mine/vite-mock-plugin/mock/home/test.ts';

const parse1 = path.parse(p)
const parse2 = path.parse(p2)


console.log('parse 1:>> ', parse1);
console.log('parse 2:>> ', parse2);

console.log('object :>> ', relativePath(p, p2));
