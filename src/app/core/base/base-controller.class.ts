import { HttpStatus } from '@nestjs/common';

export abstract class BaseController {

    protected response(res, data, incomingStatus?) {
        const status = incomingStatus || (data ? HttpStatus.OK : HttpStatus.NOT_FOUND);

        return res.status(status).json(data);
    }
}