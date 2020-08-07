import { DriverType } from '../driver/type';

export enum Strategy {
  'segment' = 'segment',
  'snowflake' = 'snowflake',
}

export interface IBufferOptions {
  strategy?: Strategy;
  driver?: DriverType;
}