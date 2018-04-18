import * as process from 'process';

export const ERROR = 'error';
export const WARN = 'warn';
export const INFO = 'info';
export const HTTP = 'http';
export const VERBOSE = 'verbose';
export const DEBUG = 'debug';
export const PRINTF_FORMAT = ' %o';
export const PROCESS_PID = process.pid;
export const DEFAULT_LOG_LEVEL = ERROR;
export const dateFormat = 'DD MM YYYY HH:mm:ss';
export const APP_NAME = 'insurance-backend';
export const LOG_LEVEL = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL;
