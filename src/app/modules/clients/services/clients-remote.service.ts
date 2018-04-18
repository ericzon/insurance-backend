import { Component } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';

import { BaseRemoteService } from '../../../core';
import { CLIENTS_URL } from '../constants';

@Component()
export class ClientsRemoteService extends BaseRemoteService {
    constructor(http: HttpService) {
        super(http, CLIENTS_URL);
    }
}
