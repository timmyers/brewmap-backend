import bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: 'api',
  stream: process.stdout,
  level: 'info',
});

export default log;
