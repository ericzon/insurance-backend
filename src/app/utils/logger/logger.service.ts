import * as winston from 'winston';
import * as common from '@nestjs/common';

import { loggerSettings } from './settings';
import {
    DEBUG,
    ERROR,
    INFO,
    WARN,
    LOG_LEVEL,
    HTTP,
    VERBOSE
} from './constants';

export class LoggerService implements common.LoggerService {
    private _logger;

    constructor(private tag: string) {
        this._logger = new winston.Logger(loggerSettings(tag));
    }

    public log(message: string, obj?: object) {
        this.output(INFO, message, obj);
    }

    public debug(message: string, obj?: object) {
        this.output(DEBUG, message, obj);
    }

    public verbose(message: string, obj?: object) {
        this.output(VERBOSE, message, obj);
    }

    public info(message: string, obj?: object) {
        this.log(message, obj);
    }

    public error(message: string, trace?: string) {
        this.output(ERROR, message, null, trace);
    }

    public warn(message: string, obj?: object) {
        this.output(WARN, message, obj);
    }

    public static isLevelEnabled(level: string) {
        return (
            winston.config.npm.levels[level] <=
            winston.config.npm.levels[LOG_LEVEL]
        );
    }

    public static isDebugEnabled() {
        return LoggerService.isLevelEnabled(DEBUG);
    }

    public static isVerboseEnabled() {
        return LoggerService.isLevelEnabled(VERBOSE);
    }

    public static isHttpEnabled() {
        return LoggerService.isLevelEnabled(HTTP);
    }

    public static isInfoEnabled() {
        return LoggerService.isLevelEnabled(INFO);
    }

    public static isWarnEnabled() {
        return LoggerService.isLevelEnabled(WARN);
    }

    public static isErrorEnabled() {
        return LoggerService.isLevelEnabled(ERROR);
    }

    private output(
        level: string,
        message: string,
        obj?: object,
        trace?: string
    ): void {
        trace
            ? this._logger.log(ERROR, trace)
            : this._logger.log(level, message, obj);
    }
}
