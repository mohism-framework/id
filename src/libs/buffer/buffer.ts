import { Dict } from '@mohism/utils';

import { IStore, DriverType } from '../driver/type';
import { IBufferOptions, Strategy } from './type';

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
    if (this.storages[name]) {
      return await this.storages[name].getId();
    }
    return -1n;
  }
}