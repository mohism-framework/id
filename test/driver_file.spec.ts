import { assert, expect } from 'chai';
import { config } from 'dotenv';
import { existsSync, unlinkSync } from 'fs';
import { describe, it } from 'mocha';
import { join } from 'path';

import FileDriver from '../src/libs/driver/file';

config();
if (existsSync(join(process.env.FILE_PATH as string, 'test'))) {
  unlinkSync(join(process.env.FILE_PATH as string, 'test'));
}
const f = new FileDriver();

describe('driver_file', () => {
  it('offer', async () => {
    expect((await f.offer())).length(2);
    assert.deepEqual(await f.offer('test'), [1n, 10n]);
    assert.deepEqual(await f.offer('test'), [11n, 20n]);
  });
});