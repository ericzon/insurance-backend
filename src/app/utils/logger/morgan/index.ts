import { APP_NAME } from '../constants';

export const morganFormat = (tokens, req, res) => {
    return [
        `[${APP_NAME}] Message:`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
};
