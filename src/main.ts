import { NestFactory } from '@nestjs/core';

import { PORT } from './settings';
import { AppModule } from './app/app.module';

(async () => {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    await app.listen(PORT);
})();
