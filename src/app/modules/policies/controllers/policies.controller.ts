import { Controller, Get, Param, Query, Res, UseGuards, UsePipes } from '@nestjs/common';

import { BaseController } from '../../../core';
import { ValidationPipe } from '../../../utils/pipes/validation.pipe';
import { RESTRICTIVE_OPTS } from '../../../core/constants';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { POLICIES_ROLES } from '../constants';
import { PoliciesDto } from '../dto/policies.dto';
import { PoliciesService } from '../services/policies.service';

@Controller('policies')
export class PoliciesController extends BaseController {
    constructor(private service: PoliciesService) {
        super();
    }

    @Get()
    @UseGuards(AuthGuard('jwt', POLICIES_ROLES))
    @UsePipes(new ValidationPipe(RESTRICTIVE_OPTS))
    public async getPoliciesByUserName(@Res() res, @Query() query: PoliciesDto) {
        const response = await this.service.getPoliciesByUsername(query);

        return this.response(res, response);
    }

    @Get(':id/user')
    @UseGuards(AuthGuard('jwt', POLICIES_ROLES))
    public async getUserByPolicyId(@Res() res, @Param('id') id) {
        const response = await this.service.getUserByPolicyId(id);

        return this.response(res, response);
    }
}
