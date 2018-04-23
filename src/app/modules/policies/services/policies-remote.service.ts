import { Component } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';

import { BaseRemoteService } from '../../../core';
import { POLICIES_URL } from '../constants';

@Component()
export class PoliciesRemoteService extends BaseRemoteService {
    constructor(http: HttpService) {
        super(http, POLICIES_URL);
    }
}
