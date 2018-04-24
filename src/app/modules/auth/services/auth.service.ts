import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

import { LoggerService } from '../../../utils/logger';
import { ClientsService } from '../../clients/services';
import { auth } from '../constants';

@Component()
export class AuthService {
    private _logger;

    constructor(private readonly clientsService: ClientsService) {
        this._logger = new LoggerService(this.constructor.name);
    }

    public async validateLogin(data) {
        const client = await this.clientsService.getClientById(data.password);

        // TODO: in a real world, improve naive password validation
        const isValidLogin =
            client &&
            data.password &&
            data.password === client.id &&
            client.name === data.name;

        return isValidLogin && (await this.createToken(client));
    }

    private async createToken(client) {
        return jwt.sign(client, auth.secret, { expiresIn: auth.expiresIn });
    }

    public async validateUser(payload): Promise<any> {
        this._logger.debug('payload: ', payload);

        return await this.clientsService.getClientById(payload.id);
    }
}
