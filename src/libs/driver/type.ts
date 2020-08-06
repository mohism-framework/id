
export enum DriverType {
  'memory' = 'memory',
  'file' = 'file',
  'mongo' = 'mongo',
  'mysql' = 'mysql',
}

export interface IStore {
  getId(): Promise<bigint>;
}

export type IdRange = [bigint, bigint];

export interface IDriver {
  offer(name: string): Promise<IdRange>;
}

export abstract class AbstractDriver implements IDriver {
  protected step: bigint = BigInt(process.env.DEFAULT_STEP || '1000');
  abstract offer(name: string): Promise<IdRange>;
}