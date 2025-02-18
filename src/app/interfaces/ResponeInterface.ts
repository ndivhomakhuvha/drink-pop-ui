export interface ResponseInterface<T = any> {
  message:    string;
  statusCode: number;
  data:       T;
}
