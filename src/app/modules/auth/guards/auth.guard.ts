import * as passport from 'passport';
import { mixin, UnauthorizedException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces/can-activate.interface';
import { ExecutionContext } from '@nestjs/common/interfaces/execution-context.interface';

import { defaultOptions } from '../constants';

const checkRole = (role, roles) => {
    return role && (roles.indexOf(role) > -1);
};

export const AuthGuard = (type, options: any = defaultOptions) => {
    options = { ...defaultOptions, ...options };

    const guard = mixin(
        class implements CanActivate {

            public async canActivate(context: ExecutionContext): Promise<boolean> {
                const request = context;
                const response = (context as any).res;

                request[options.property || defaultOptions.property] = await new Promise((resolve, reject) =>
                    passport.authenticate(type, options, (err, user, info) => {
                        if (err || !user || !checkRole(user.role, options.roles)) {
                            return reject(err || new UnauthorizedException());
                        }

                        resolve(user);
                    })(request, response, resolve),
                );
                return true;
            }
        },
    );

    return guard;
};
