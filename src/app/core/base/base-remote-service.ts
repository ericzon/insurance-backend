import { HttpService } from '@nestjs/common/http';
import { AxiosResponse } from '@nestjs/common/http/interfaces/axios.interfaces';

export abstract class BaseRemoteService {

    constructor(
        protected _http: HttpService,
        protected _url: string
    ) {}

    public async getList(): Promise<any> {
        const response = await this._http.get(this._url).toPromise();

        return this.unwrapData(response);
    }

    private unwrapData(response: AxiosResponse<any>) {
        return response.data ? response.data : response;
    }
}