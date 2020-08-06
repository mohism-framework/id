import { config } from 'dotenv';
import { describe, it } from 'mocha';

import Snowflake from '../src/libs/store/slowflake';
import { assert } from 'chai';

config();

const s = new Snowflake({ name: 'default' });


describe('store_snowflake', () => {
  it('get id', async () => {
    const [id1, id2] = [await s.getId(), await s.getId()];
    assert(id1 < id2);
  })
})