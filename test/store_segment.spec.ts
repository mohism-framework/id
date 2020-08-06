import { config } from 'dotenv';
import { describe, it } from 'mocha';

import Segment from '../src/libs/store/segment';
import { assert } from 'chai';
import { DriverType } from '../src/libs/driver/type';

config();

const s = new Segment({
  name: 'default',
  driver: DriverType.file,
});

describe('store_segment', () => {
  it('get id', async () => {
    const id1 = await s.getId();
    const id2 = await s.getId();
    assert(id2 > id1);
    for (let i = 0; i < 10; i++) {
      await s.getId();
    }
    const id3 = await s.getId();
    assert(id3 > id2);
  })
})