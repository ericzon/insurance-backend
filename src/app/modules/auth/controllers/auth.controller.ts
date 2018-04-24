import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UsePipes
} from '@nestjs/common';

import { ValidationPipe } from '../../../utils/pipes/validation.pipe';
import { BaseController } from '../../../core/base';
import { RESTRICTIVE_OPTS } from '../../../core/constants';
import { AuthService } from '../services/auth.service';
import { LoginDataDto } from '../dto/login-data.dto';

@Controller('auth')
export class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
        super();
    }

    @Post('login')
    @UsePipes(new ValidationPipe(RESTRICTIVE_OPTS))
    public async login(@Res() res, @Body() data: LoginDataDto, @Req() req) {
        const response = await this.authService.validateLogin(data);

        return this.response(
            res,
            response,
            !response && HttpStatus.UNAUTHORIZED
        );
    }
}
