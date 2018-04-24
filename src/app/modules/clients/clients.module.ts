import * as passport from 'passport';
import * as filter from 'lodash.filter';
import { Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';

import { CLIENTS_ROLES } from './constants';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { ClientsRemoteService } from './services/clients-remote.service';

@Module({
    controllers: [ClientsController],
    components: [
        ClientsRemoteService,
        ClientsService,
        {
            provide: 'filter',
            useValue: filter
        }
    ],
    imports: [HttpModule],
    exports: [ClientsService]
})
export class ClientsModule {}
