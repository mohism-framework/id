import { DriverType, IDriver } from "./type";
import { Dict } from "@mohism/utils";
import MemoryDriver from './memory';
import FileDriver from "./file";

const INSTANCES: Dict<IDriver> = {};

export default (driver: DriverType): IDriver => {
  if (!INSTANCES[driver]) {
    switch (driver) {
      case DriverType.memory:
        INSTANCES[driver] = new MemoryDriver();
        break;
      case DriverType.file:
        INSTANCES[driver] = new FileDriver();
        break;
    }
  }
  return INSTANCES[driver];
}