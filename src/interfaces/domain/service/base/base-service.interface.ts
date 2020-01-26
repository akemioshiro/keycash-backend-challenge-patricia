export interface IBaseService <TInstance, TAttribute> {
    post(requestData: any): Promise<any>;
    put(requestData: any): Promise<any>;
    delete(id: string): Promise<any>;
    get(requestData: any): PromiseLike<any>;
}  