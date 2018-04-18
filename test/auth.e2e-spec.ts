import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { TEST_PORT } from './constants';
import { AuthModule } from '../src/app/modules/auth/auth.module';

describe('Auth Controller (e2e)', () => {
    const apiPrefix = '/api';
    let app: INestApplication;
    let validToken = '';

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                AuthModule
            ]
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    it('/POST /api/auth/login (401)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .post(apiPrefix + '/auth/login')
            .send({
                "name": "NoUser",
                "password": "nopassword"
            })
            .expect(401);

        return response;
    });

    it('/POST /api/auth/login (401)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .post(apiPrefix + '/auth/login')
            .send({
                "name": "Britney",
                "password": "wrongPassword"
            })
            .expect(401);

        return response;
    });

    it('/POST /api/auth/login (400)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .post(apiPrefix + '/auth/login')
            .send({
                "otherfield": "Britney",
                "password": "a0ece5db-cd14-4f21-812f-966633e7be86"
            })
            .expect(400);

        return response;
    });

    it('/POST /api/auth/login (200)', async () => {
        const response = await request(`http://localhost:${TEST_PORT}`)
            .post(apiPrefix + '/auth/login')
            .send({
                "name": "Britney",
                "password": "a0ece5db-cd14-4f21-812f-966633e7be86"
            })
            .expect(200);

        validToken = response.body;

        return response;
    });

    afterAll(async () => {
        await app.close();
    });
});
