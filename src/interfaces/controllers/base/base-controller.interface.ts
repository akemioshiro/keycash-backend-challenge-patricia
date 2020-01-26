export interface IBaseController<TInstance, TAttribute> {
  getAll(req: any, res: any): PromiseLike<any>;
  getById(id: string, req: any, res: any): PromiseLike<any>;
  put(req: any, res: any): PromiseLike<any>;
  delete(id: string, req: any, resp: any): PromiseLike<any>;
  post(req: any, res: any): PromiseLike<any>;
}