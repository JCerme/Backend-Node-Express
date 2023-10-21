import winston from 'winston';
import dotenv from 'dotenv'
dotenv.config();

const levelOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5,
    },
    colors: {
        debug: 'blue',
        http: 'green',
        info: 'cyan',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta',
    },
};

winston.addColors(levelOptions.colors);

const myFormat = winston.format.printf(({ level, message, label, timestamp, ...metadata }) => {
    let msg = `${level}: ${message} `;  // default output
    if (metadata && Object.keys(metadata).length) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

export const logger = winston.createLogger({
    levels: levelOptions.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        myFormat  // use the custom format
    ),
    transports: [
    new winston.transports.Console({
        level: process.env.ENVIRONMENT === 'production' ? 'info' : 'debug',
    }),
    new winston.transports.File({
        filename: 'errors.log',
        level: 'error',
    }),
    ],
});
