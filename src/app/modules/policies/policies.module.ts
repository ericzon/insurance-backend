import * as filter from 'lodash.filter';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';

import { ClientsModule } from '../clients/clients.module';
import { PoliciesService } from './services/policies.service';
import { PoliciesController } from './controllers/policies.controller';
import { PoliciesRemoteService } from './services/policies-remote.service';

@Module({
    controllers: [PoliciesController],
    components: [
        PoliciesService,
        PoliciesRemoteService,
        {
            provide: 'filter',
            useValue: filter
        }
    ],
    imports: [HttpModule, ClientsModule],
    exports: [PoliciesService]
})
export class PoliciesModule {}
