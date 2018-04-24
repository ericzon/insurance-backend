import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, UnauthorizedException } from '@nestjs/common';

import { auth } from '../constants';
import { AuthService } from './auth.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: auth.secret
            },
            async (req, payload, next) => await this.verify(req, payload, next)
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid = await this.authService.validateUser(payload);

        return isValid
            ? done(null, payload)
            : done(new UnauthorizedException(), false);
    }
}
