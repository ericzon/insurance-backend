import { Module } from '@nestjs/common';

import { ClientsModule, PoliciesModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [ClientsModule, PoliciesModule, AuthModule]
})
export class AppModule {}
