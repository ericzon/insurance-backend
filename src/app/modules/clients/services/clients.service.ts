import { Component, Inject } from '@nestjs/common';

import { BaseService } from '../../../core';
import { ClientsRemoteService } from './clients-remote.service';

@Component()
export class ClientsService extends BaseService {
    constructor(remote: ClientsRemoteService, @Inject('filter') filter) {
        super(remote, filter);
    }

    public async getClientById(id: string) {
        const results = await this.getClients({ id });

        return this.getSingle(results);
    }

    public async getClients(query) {
        const response = await this._remote.getList();

        return this.filter(query, response.clients);
    }

    public async getClientIdFromName(name: string) {
        const results = await this.getClients({ name });
        const client = this.getSingle(results);

        return client.id ? client.id : client;
    }
}
