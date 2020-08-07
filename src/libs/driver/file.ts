import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';

import { AbstractDriver, IdRange } from './type';
import { Dict } from '@mohism/utils';
import { join } from 'path';


export default class FileDriver extends AbstractDriver {
  private dir: string = process.env.FILE_PATH as string;
  private pool: Dict<bigint> = {};

  constructor() {
    super();
    /* istanbul ignore next */
    if (!existsSync(this.dir)) {
      throw new Error(`Path Not Exists: process.env.FILE_PATH = ${process.env.FILE_PATH}`);
    }
    try {
      /* istanbul ignore next */
      readdirSync(this.dir).forEach((file: string) => {
        this.pool[file] = BigInt(readFileSync(join(this.dir, file)).toString());
      });
    } catch (error) {
      /* istanbul ignore next */
      throw new Error(`Read File Error: ${error.message}`);
    }
  }

  async offer(name: string = 'default'): Promise<IdRange> {
    let [from, to] = [-1n, -1n];
    if (!this.pool[name]) {
      this.pool[name] = 0n;
    }
    [from, to] = [this.pool[name] + 1n, this.pool[name] + this.step];
    this.pool[name] = to;
    process.nextTick(() => {
      writeFileSync(join(this.dir, name), `${to}`);
    });
    return [from, to];
  }
}