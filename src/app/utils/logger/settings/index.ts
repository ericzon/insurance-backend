import { config, transports } from 'winston';

import { APP_NAME, PROCESS_PID, LOG_LEVEL } from '../constants';

const customFormat = (options, tag) => {
    const level = config.colorize(options.level, options.level.toUpperCase());

    return (
        `[${APP_NAME}] Message: ${options.timestamp()} ${level} [${PROCESS_PID}] ${tag}: ${
            options.message
        }` +
        `${
            options.meta && Object.keys(options.meta).length
                ? '\n\t' + JSON.stringify(options.meta)
                : ''
        }`
    );
};

const consoleConfig = (tag) => {
    return {
        timestamp: () => {
            return new Date().toISOString();
        },
        formatter: (options) => {
            return customFormat(options, tag);
        }
    };
};

export const loggerSettings = (tag) => {
    return {
        transports: [new transports.Console(consoleConfig(tag))],
        level: LOG_LEVEL
    };
};
