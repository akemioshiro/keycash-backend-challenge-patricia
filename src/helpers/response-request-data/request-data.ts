export interface IRequestData {
    body?: any;
    headers?: any;
    httpMethod: HttpMethod;
    path: string;
    queryString?: any;
    routeParam?: any;
  }
  
export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
  }
  