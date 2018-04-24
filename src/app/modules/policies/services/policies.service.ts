import { Component, Inject } from '@nestjs/common';

import { BaseService } from '../../../core';
import { ClientsService } from '../../clients';
import { PoliciesRemoteService } from './policies-remote.service';

@Component()
export class PoliciesService extends BaseService {
    constructor(
        remote: PoliciesRemoteService,
        @Inject('filter') filter,
        private clientsService: ClientsService
    ) {
        super(remote, filter);
    }

    public async getPolicies(query: object) {
        const response = await this._remote.getList();

        return this.filter(query, response.policies);
    }

    public async getPoliciesByUsername({ name }) {
        const id = await this.clientsService.getClientIdFromName(name);

        return await this.getPolicies({ clientId: id });
    }

    public async getUserByPolicyId(id: string) {
        const policies = await this.getPolicies({ id });
        const policy = this.getSingle(policies);

        return policy
            ? this.clientsService.getClientById(policy.clientId)
            : null;
    }
}
