/* istanbul ignore next */
import { config } from 'dotenv';
import { createServer } from 'http';
import MainBuffer from './libs/buffer/index';
import { Strategy } from './libs/buffer/type';
import { DriverType } from './libs/driver/type';

config();

const main = new MainBuffer({
  strategy: process.env.STRATEGY as Strategy,
  driver: process.env.STORAGE_DRIVER as DriverType,
});

createServer((req, res) => {
  const [, name] = (req.url || '/default').split('/');
  main.get(name || 'default').then((id: bigint) => {
    res.end(JSON.stringify({
      id: id.toString(),
    }));
  }).catch(e => {
    res.statusCode = 400;
    res.end(JSON.stringify({
      msg: e.message,
    }));
  });
}).listen(process.env.PORT || 3000);