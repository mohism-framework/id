import { assert } from 'chai';
import { config } from 'dotenv';
import { describe, it } from 'mocha';

import MemoryDriver from '../src/libs/driver/memory';

config();
const m = new MemoryDriver();

describe('dreiver-memory', () => {
  it('offer', async () => {
    assert.deepEqual(await m.offer(),[1n,10n])
    assert.deepEqual(await m.offer(),[11n,20n])
    assert.deepEqual(await m.offer('foo'),[1n,10n])
  })
});