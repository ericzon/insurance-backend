import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';

import { PORT } from './settings';
import { AppModule } from './app/app.module';
import { morganFormat, LoggerService } from './app/utils';

(async () => {
    const instance: express.Application = express();

    instance.use(helmet());
    instance.use(compression());
    instance.use(morgan(morganFormat));
    instance.use(bodyParser.json());
    instance.use(bodyParser.urlencoded({ extended: false }));

    const app = await NestFactory.create(AppModule, instance, {
        logger: new LoggerService('bootstrap'),
        cors: true
    });

    app.setGlobalPrefix('api');

    await app.listen(PORT);
})();
