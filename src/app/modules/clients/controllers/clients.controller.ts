import { Controller, Get, Param, Query, Res, UseGuards, UsePipes } from '@nestjs/common';

import { ValidationPipe } from '../../../utils/pipes/validation.pipe';
import { RESTRICTIVE_OPTS } from '../../../core/constants';
import { BaseController } from '../../../core';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ClientsService } from '../services';
import { CLIENTS_ROLES } from '../constants';
import { ClientsDto } from '../dto/clients.dto';

@Controller('clients')
export class ClientsController extends BaseController {
    constructor(private service: ClientsService) {
        super();
    }

    @Get()
    @UseGuards(AuthGuard('jwt', CLIENTS_ROLES))
    @UsePipes(new ValidationPipe(RESTRICTIVE_OPTS))
    public async getClients(@Query() query: ClientsDto, @Res() res) {
        const response = await this.service.getClients(query);

        return this.response(res, response);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt', CLIENTS_ROLES))
    public async getClientById(@Param('id') id, @Res() res) {
        const response = await this.service.getClientById(id);

        return this.response(res, response);
    }
}
