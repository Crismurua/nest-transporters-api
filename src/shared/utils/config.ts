import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  clientHttp: {
    port: parseInt(process.env.CLIENT_HTTP_PORT || '3000', 10),
  },
  serverTcp: {
    port: parseInt(process.env.SERVER_TCP_PORT || '3001', 10),
  },
  tcpClient: {
    host: process.env.TCP_HOST || 'localhost',
    port: parseInt(process.env.TCP_PORT || '3001', 10),
    timeout: parseInt(process.env.TCP_TIMEOUT || '5000', 10),
    reconnectAttempts: parseInt(process.env.TCP_RECONNECT_ATTEMPTS || '3', 10),
    reconnectDelay: parseInt(process.env.TCP_RECONNECT_DELAY || '1000', 10),
  },
}; 