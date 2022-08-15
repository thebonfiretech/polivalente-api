import chalk from 'chalk';

import logger from './utils/logger';
import { app } from './app';


const PORT = process.env.PORT || 3000
const server = app.listen(PORT, async () => {
    logger.info(`🚀 server started on ${chalk.yellowBright.underline('https://localhost:' + PORT)}.`);
});

process.on('SIGINT', () => {
    server.close()
   logger.warning('finished application')
})