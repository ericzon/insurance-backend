import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing/testing-module';
import { NestEnvironment } from '@nestjs/common/enums/nest-environment.enum';

import { filterMock } from './mocks/filter.mock';
import { ClientsRemoteService, ClientsService } from '../services';
import { ClientsRemoteServiceMock } from './mocks/clients-remote.service.mock';

describe('Clients service', () => {
    let module: TestingModule;
    let spies, injector;

    beforeEach(async () => {
        Logger.setMode(NestEnvironment.TEST);
        module = await Test.createTestingModule({
            components: [
                ClientsService,
                {
                    provide: ClientsRemoteService,
                    useValue: ClientsRemoteServiceMock
                },
                {
                    provide: 'filter',
                    useValue: filterMock
                }
            ]
        }).compile();

        initInjectors();
    });

    afterEach(() => {
        spies.service.getClients.mockRestore();
        spies.service.getSingle.mockRestore();
    });

    it('should exist service when module is created', () => {
        expect(injector.service).toBeDefined();
        expect(injector.remote).toBeDefined();
        expect(injector.filter).toBeDefined();
    });

    it('should return first element when right id is requested', async () => {
        const fakeList = [{ id: '1234', item: 'fake' }];
        spies.service.getClients.mockImplementation(({ id }) => {
            return fakeList;
        });
        spies.service.getSingle.mockImplementation((list) => list[0]);

        const result = await injector.service.getClientById('1234');

        expect(result).toEqual(fakeList[0]);
    });

    it('should return a valid list when data is requested from remote', async () => {
        const fakeList = [{ id: '1234', item: 'fake' }];
        const query = {};
        spies.remote.getClients.mockImplementation(({ id }) => {
            return fakeList;
        });
        spies.service.filter.mockImplementation((query, list) => list[0]);

        const result = await injector.service.getClients(query);

        expect(result).toEqual(fakeList);
    });

    it('should return a valid id when data is queried & filtered from list', async () => {
        const fakeList = [{ id: '1234', name: 'fake' }];
        spies.service.getClients.mockImplementation(({ name }) => {
            return fakeList;
        });
        spies.service.getSingle.mockImplementation((list) => list[0]);

        const result = await injector.service.getClientIdFromName('fakeName');

        expect(result).toEqual(fakeList[0].id);
    });

    const initInjectors = () => {
        injector = {
            service: module.get<ClientsService>(ClientsService),
            remote: module.get<ClientsRemoteService>(ClientsRemoteService),
            filter: module.get('filter')
        };

        initSpies();
    };

    const initSpies = () => {
        spies = {
            service: {
                getClientById: jest.spyOn(injector.service, 'getClientById'),
                getClients: jest.spyOn(injector.service, 'getClients'),
                getSingle: jest.spyOn(injector.service, 'getSingle'),
                filter: jest.spyOn(injector.service, 'filter'),
                getClientIdFromName: jest.spyOn(
                    injector.service,
                    'getClientIdFromName'
                )
            },
            remote: {
                getClients: jest.spyOn(injector.service, 'getClients')
            }
        };
    };
});
