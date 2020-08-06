import { assert, expect } from 'chai';
import { describe, it } from 'mocha';

import Factory from '../src/libs/driver/factory';
import FileDriver from '../src/libs/driver/file';
import MemoryDriver from '../src/libs/driver/memory';
import { DriverType } from '../src/libs/driver/type';

describe('driver-factory', () => {
  it('get instance memory', async () => {
    expect(await Factory(DriverType.memory)).instanceOf(MemoryDriver);
  });
  it('get instance file', async () => {
    expect(await Factory(DriverType.file)).instanceOf(FileDriver);
  });
  it('singleton', async () => {
    const instance1 = await Factory(DriverType.memory);
    const instance2 = await Factory(DriverType.memory);
    assert.equal(instance1, instance2);
  })
})