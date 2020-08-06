import { DriverType } from '../driver/type';

interface IOption {
  name:string;
}

export interface ISementOption extends IOption {
  driver?:DriverType;
}

export interface ISnowflakeOption extends IOption {
  
}