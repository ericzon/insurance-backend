export abstract class BaseService {
    protected _filter;
    protected _remote;

    constructor(remote, filter) {
        this._filter = filter;
        this._remote = remote;
    }

    protected filter(query: object, list) {
        return this._filter(list, query);
    }

    protected getSingle(list) {
        return list.length ? list[0] : null;
    }
}
