export interface TcpSuccessResponse<T = any> {
  status: 'ok';
  data: T;
}

export interface TcpErrorResponse {
  status: 'error';
  message: string;
}

export type TcpResponse<T = any> = TcpSuccessResponse<T> | TcpErrorResponse;

export interface PingResponse {
  status: 'ok';
  data: 'pong';
}

export interface TimeResponse {
  status: 'ok';
  data: string; // ISO string
}

export interface ReverseStringResponse {
  status: 'ok';
  data: string; // reversed string
} 