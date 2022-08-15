import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';
import log from 'gulog';
import cors from 'cors';


import { router } from '@routes/index';
import Errors from './utils/error';



export const {sendError} = new Errors(); 
export const app = express();


app.use(morgan('dev'));
app.use(express.json())
app.use(helmet());
app.use(cors());

app.use('/v1', router);

/*
app.use((err, req, res) =>  {
    
    if (err.isCustomError === true) return sendError(res, err.message);
    log.error(`An error ocurred at route ${chalk.red(req.originalUrl)}:`);
    console.log(err);
    return sendError(res, 'internal_error');
    
});
*/