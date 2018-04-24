import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing/testing-module';
import { NestEnvironment } from '@nestjs/common/enums/nest-environment.enum';

import { ClientsService } from '../../clients/services';
import { filterMock } from '../../clients/tests/mocks/filter.mock';
import { PoliciesService } from '../services/policies.service';
import { PoliciesRemoteService } from '../services/policies-remote.service';
import { ClientsServiceMock } from './mocks/clients.service.mock';
import { PoliciesRemoteServiceMock } from './mocks/policies-remote.service.mock';

describe('Policies service', () => {
    let module: TestingModule;
    let spies, injector;

    beforeEach(async () => {
        Logger.setMode(NestEnvironment.TEST);
        module = await Test.createTestingModule({
            components: [
                PoliciesService,
                {
                    provide: PoliciesRemoteService,
                    useValue: PoliciesRemoteServiceMock
                },
                {
                    provide: 'filter',
                    useValue: filterMock
                }
            ]
        })
            .overrideComponent(ClientsService)
            .useValue(ClientsServiceMock)
            .compile();

        initInjectors();
    });

    afterEach(() => {
        spies.service.filter.mockRestore();
        spies.service.getPolicies.mockRestore();
        spies.service.getSingle.mockRestore();
        spies.remote.getList.mockRestore();
        spies.clientsService.getClientById.mockRestore();
        spies.clientsService.getClientIdFromName.mockRestore();
    });

    it('should exist service when module is created', () => {
        expect(injector.service).toBeDefined();
        expect(injector.clientsService).toBeDefined();
        expect(injector.remote).toBeDefined();
        expect(injector.filter).toBeDefined();
    });

    it('should return a list of filtered policies when receives constraints', async () => {
        const fakeList = [{ id: '1234', item: 'fake' }];
        spies.remote.getList.mockImplementation(() => {
            return { policies: fakeList };
        });

        spies.service.filter.mockImplementation((query, list) => list[0]);

        const result = await injector.service.getPolicies({ id: '1234' });

        expect(result).toEqual(fakeList[0]);
    });

    it('should return a list of items when client id is provided', async () => {
        const fakeList = [{ id: '1234', clientId: 'fakeId' }];
        spies.clientsService.getClientIdFromName.mockImplementation((name) => {
            return 'fakeId';
        });

        spies.service.getPolicies.mockImplementation((query) => fakeList);

        const result = await injector.service.getPoliciesByUsername({
            name: 'fakeName'
        });

        expect(result).toEqual(fakeList);
    });

    it('should return a list of items when client id is provided', async () => {
        const fakeList = [{ id: '1234', clientId: 'fakeId' }];
        spies.service.getPolicies.mockImplementation((query) => fakeList);
        spies.service.getSingle.mockImplementation((policies) => {
            return fakeList;
        });
        spies.clientsService.getClientById.mockImplementation((id) => {
            return fakeList;
        });

        const result = await injector.service.getUserByPolicyId('1234');

        expect(result).toEqual(fakeList);
    });

    const initInjectors = () => {
        injector = {
            service: module.get<PoliciesService>(PoliciesService),
            clientsService: module.get<ClientsService>(ClientsService),
            remote: module.get<PoliciesRemoteService>(PoliciesRemoteService),
            filter: module.get('filter')
        };

        initSpies();
    };

    const initSpies = () => {
        spies = {
            service: {
                getPoliciesByUsername: jest.spyOn(
                    injector.service,
                    'getPoliciesByUsername'
                ),
                getUserByPolicyId: jest.spyOn(
                    injector.service,
                    'getUserByPolicyId'
                ),
                getPolicies: jest.spyOn(injector.service, 'getPolicies'),
                getSingle: jest.spyOn(injector.service, 'getSingle'),
                filter: jest.spyOn(injector.service, 'filter')
            },
            clientsService: {
                getClientById: jest.spyOn(
                    injector.clientsService,
                    'getClientById'
                ),
                getClientIdFromName: jest.spyOn(
                    injector.clientsService,
                    'getClientIdFromName'
                )
            },
            remote: {
                getList: jest.spyOn(injector.remote, 'getList')
            }
        };
    };
});
