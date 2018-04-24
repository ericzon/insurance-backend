import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { TEST_PORT } from './constants';
import { ClientsModule } from '../src/app/modules/clients';

describe('Clients Controller (e2e)', async () => {
    const apiPrefix = '/api';
    let app: INestApplication;
    let validToken = '';

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [ClientsModule]
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    it('/POST /api/auth/login (200)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .post(apiPrefix + '/auth/login')
            .send({
                name: 'Britney',
                password: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            })
            .expect(200);

        validToken = response.body;

        return response;
    });

    it('/POST /api/clients/:id (401)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .get(apiPrefix + '/clients/a0ece5db-cd14-4f21-812f-966633e7be86')
            .set({
                Authorization: 'Bearer wrongToken'
            })
            .expect(401);

        return response;
    });

    it('/POST /api/clients/:id (200)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .get(apiPrefix + '/clients/a0ece5db-cd14-4f21-812f-966633e7be86')
            .set({
                Authorization: 'Bearer ' + validToken
            })
            .expect(200)
            .expect({
                id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
                name: 'Britney',
                email: 'britneyblankenship@quotezart.com',
                role: 'admin'
            });

        return response;
    });

    it('/POST /api/clients?name={name} (200)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .get(apiPrefix + '/clients?name=Manning')
            .set({
                Authorization: 'Bearer ' + validToken
            })
            .expect(200)
            .expect([
                {
                    id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
                    name: 'Manning',
                    email: 'manningblankenship@quotezart.com',
                    role: 'admin'
                }
            ]);

        return response;
    });

    afterAll(async () => {
        await app.close();
    });
});
