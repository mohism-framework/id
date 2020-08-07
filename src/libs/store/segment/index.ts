import DriverFactory from '../../driver/factory';
import { DriverType, IdRange, IDriver, IStore } from '../../driver/type';
import { ISementOption } from '../type';
import { Strategy } from '../../buffer/type';

export default class Segment implements IStore {
  private name: string;
  private type: Strategy = Strategy.segment;
  private current: bigint = -1n;
  private max: bigint = -1n;
  private next: IdRange = [-1n, -1n];
  private driver: IDriver;

  constructor({ name, driver = DriverType.memory }: ISementOption) {
    this.name = name;
    this.driver = DriverFactory(driver);
    this.init();
  }

  async init() {
    [this.current, this.max] = await this.driver.offer(this.name);
    this.next = await this.driver.offer(this.name);
  }

  async getId(): Promise<bigint> {
    // 当前号段使用完毕时，后背号段上场，并申请后备号段
    if (this.current > this.max) {
      [this.current, this.max] = this.next;
      process.nextTick(async () => {
        this.next = await this.driver.offer(this.name);
      });
    }
    return BigInt(this.current++);
  }
}