import { Dict } from '@mohism/utils';

import { IStore, DriverType } from '../driver/type';
import { IBufferOptions, Strategy } from './type';
import Segment from '../store/segment';
import Snowflake from '../store/slowflake';

export interface IBuffer {
  get(name: string): Promise<bigint>;
}

export abstract class AbstractBuffer implements IBuffer {
  protected storages: Dict<IStore>;
  protected strategy: Strategy;
  protected driver: DriverType;

  constructor({
    strategy = Strategy.segment,
    driver = DriverType.memory,
  }: IBufferOptions) {
    this.strategy = strategy;
    this.driver = driver;
    this.storages = {};
  }

  async get(name: string): Promise<bigint> {
    if (!this.storages[name]) {
      switch (this.strategy) {
        case Strategy.segment:
          this.storages[name] = new Segment({ name, driver: this.driver });
          break;
        case Strategy.snowflake:
          this.storages[name] = new Snowflake({ name });
          break;
      }
      return -1n;
    }
    return await this.storages[name].getId();
  }
}