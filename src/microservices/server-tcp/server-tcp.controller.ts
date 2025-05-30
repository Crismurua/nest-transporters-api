import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReverseStringDto } from '../../shared/dtos/reverse-string.dto';
import { TcpResponse, PingResponse, TimeResponse, ReverseStringResponse } from '../../shared/interfaces/tcp-response.interface';
import { ServerTcpService } from './server-tcp.service';

@Controller()
export class ServerTcpController {
  private readonly logger = new Logger(ServerTcpController.name);

  constructor(private readonly serverTcpService: ServerTcpService) {}

  @MessagePattern('ping')
  async handlePing(): Promise<PingResponse> {
    this.logger.log('Recibido patrón: ping');
    const response = this.serverTcpService.ping();
    this.logger.log(`Respuesta ping: ${JSON.stringify(response)}`);
    return response;
  }

  @MessagePattern('getTime')
  async handleGetTime(): Promise<TimeResponse> {
    this.logger.log('Recibido patrón: getTime');
    const response = this.serverTcpService.getTime();
    this.logger.log(`Respuesta getTime: ${JSON.stringify(response)}`);
    return response;
  }

  @MessagePattern('reverseString')
  async handleReverseString(@Payload() payload: ReverseStringDto): Promise<TcpResponse<string>> {
    this.logger.log(`Recibido patrón: reverseString con payload: ${JSON.stringify(payload)}`);
    
    try {
      const response = this.serverTcpService.reverseString(payload);
      this.logger.log(`Respuesta reverseString: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      const errorResponse = {
        status: 'error' as const,
        message: error.message || 'Error interno del servidor'
      };
      this.logger.error(`Error en reverseString: ${JSON.stringify(errorResponse)}`);
      return errorResponse;
    }
  }
} 