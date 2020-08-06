import { Dict } from '@mohism/utils';

import { AbstractDriver, IdRange } from './type';


export default class MemoryDriver extends AbstractDriver {
  private pool: Dict<bigint> = {};
  
  async offer(name: string = 'default'): Promise<IdRange> {
    let [from, to] = [-1n, -1n];
    if (!this.pool[name]) {
      this.pool[name] = 0n;
    }
    [from, to] = [this.pool[name]+1n, this.pool[name] + this.step];
    this.pool[name] = to;
    return [from, to];
  }
}