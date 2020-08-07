import { describe, it } from 'mocha';

import MainBuffer from '../src/libs/buffer';
import { Strategy } from '../src/libs/buffer/type';
import { DriverType } from '../src/libs/driver/type';
import { assert } from 'chai';


describe('buffer_main', () => {
  it('segment', async () => {
    const buffer = new MainBuffer({
      strategy: Strategy.segment,
      driver: DriverType.memory,
    })
    assert.deepEqual((await buffer.get('default')).toString(), '0');
    assert.deepEqual((await buffer.get('default')).toString(), '1');
    assert.deepEqual((await buffer.get('default')).toString(), '2');
  })

  it('buffer_snowflake', async () => {
    const buffer = new MainBuffer({
      strategy: Strategy.snowflake
    })
    const id1 = await buffer.get('default')
    const id2 = await buffer.get('default')
    assert(id1 < id2);
  })
})