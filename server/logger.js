const winston = require('winston');

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(info => `${info.level}: [${[info.timestamp]}]: ${info.message}`),
            ),
            handleExceptions: true,
            handleRejections: true,
        }),
        new winston.transports.File({
            filename: './logs/server.log',
            format: winston.format.json(
                winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                winston.format.align(),
                winston.format.printf(info => `${info.level}: ${info.timestamp}: ${info.message}`),
            )

        })
    ],
});

module.exports.logger = logger

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}