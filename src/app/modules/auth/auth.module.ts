import { Module } from '@nestjs/common';

import { ClientsModule } from '../clients';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt-strategy.service';
import { AuthController } from './controllers/auth.controller';

@Module({
    controllers: [
        AuthController
    ],
    components: [
        AuthService,
        JwtStrategy
    ],
    imports: [
        ClientsModule
    ]
})
export class AuthModule {}
