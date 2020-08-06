import { IStore } from "../../driver/type";
import { ISnowflakeOption } from '../type';
import { Strategy } from '../../buffer/type';

// when i wrote this codes
const TIME_OFFSET = 1596693592954;

export default class Snowflake implements IStore {
  private name: string;
  private type: Strategy = Strategy.snowflake;
  private seq: bigint = 0n;
  constructor({ name }: ISnowflakeOption) {
    this.name = name;
  }

  async getId(): Promise<bigint> {
    let id = 0n << 63n;
    const time = BigInt(Date.now() - TIME_OFFSET);
    id += time << 22n;
    const region = BigInt(process.env.REGION || 0);
    id += region << 17n;
    const machine = BigInt(process.env.MACHINE || 0);
    id += machine << 12n;
    this.seq = (this.seq + 1n) % 2048n;
    return id + this.seq;
  }
}