import { config } from 'dotenv';
import { createServer } from 'http';
/* istanbul ignore next */
config();
/* istanbul ignore next */
createServer((req, res) => {
  let [, name] = (req.url || '/default').split('/');
}).listen(process.env.PORT || 3000);