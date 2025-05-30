import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable, firstValueFrom, timeout, retry, catchError, throwError } from 'rxjs';
import { config } from '../../shared/utils/config';
import { TcpResponse } from '../../shared/interfaces/tcp-response.interface';

@Injectable()
export class TcpClientService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TcpClientService.name);
  private client: ClientProxy;

  async onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: config.tcpClient.host,
        port: config.tcpClient.port,
      },
    });

    try {
      await this.client.connect();
      this.logger.log(`✅ Conectado al servidor TCP en ${config.tcpClient.host}:${config.tcpClient.port}`);
    } catch (error) {
      this.logger.error(`❌ Error al conectar con el servidor TCP: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
      this.logger.log('🔌 Conexión TCP cerrada');
    }
  }

  async sendMessage<T>(pattern: string, data?: any): Promise<TcpResponse<T>> {
    try {
      this.logger.log(`📤 Enviando mensaje con patrón: ${pattern}${data ? `, datos: ${JSON.stringify(data)}` : ''}`);
      
      const response$ = this.client.send<TcpResponse<T>>(pattern, data || {}).pipe(
        timeout(config.tcpClient.timeout),
        retry({
          count: config.tcpClient.reconnectAttempts,
          delay: config.tcpClient.reconnectDelay,
        }),
        catchError((error) => {
          this.logger.error(`❌ Error en comunicación TCP: ${error.message}`);
          return throwError(() => new Error(`Error de comunicación TCP: ${error.message}`));
        })
      );

      const response = await firstValueFrom(response$);
      this.logger.log(`📥 Respuesta recibida: ${JSON.stringify(response)}`);
      
      return response;
    } catch (error) {
      this.logger.error(`❌ Error al enviar mensaje TCP: ${error.message}`);
      throw new Error(`Error de comunicación con el servidor TCP: ${error.message}`);
    }
  }

  async ping(): Promise<TcpResponse<string>> {
    return this.sendMessage('ping');
  }

  async getTime(): Promise<TcpResponse<string>> {
    return this.sendMessage('getTime');
  }

  async reverseString(text: string): Promise<TcpResponse<string>> {
    return this.sendMessage('reverseString', { text });
  }
} 