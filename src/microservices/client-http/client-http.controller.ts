import { Controller, Get, Query, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TcpClientService } from './tcp-client.service';
import { QueryTextDto } from '../../shared/dtos/query-text.dto';
import { TcpResponse } from '../../shared/interfaces/tcp-response.interface';

@Controller()
export class ClientHttpController {
  private readonly logger = new Logger(ClientHttpController.name);

  constructor(private readonly tcpClientService: TcpClientService) {}

  @Get('ping')
  async ping(): Promise<TcpResponse<string>> {
    try {
      this.logger.log('🌐 Endpoint /ping llamado');
      const response = await this.tcpClientService.ping();
      
      if (response.status === 'error') {
        throw new HttpException(response.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response;
    } catch (error) {
      this.logger.error(`❌ Error en endpoint /ping: ${error.message}`);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Error de comunicación con el servidor TCP',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Get('time')
  async getTime(): Promise<TcpResponse<string>> {
    try {
      this.logger.log('🌐 Endpoint /time llamado');
      const response = await this.tcpClientService.getTime();
      
      if (response.status === 'error') {
        throw new HttpException(response.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response;
    } catch (error) {
      this.logger.error(`❌ Error en endpoint /time: ${error.message}`);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Error de comunicación con el servidor TCP',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Get('reverse')
  async reverseString(@Query() query: QueryTextDto): Promise<TcpResponse<string>> {
    try {
      this.logger.log(`🌐 Endpoint /reverse llamado con texto: "${query.text}"`);
      
      if (!query.text) {
        throw new HttpException(
          'El parámetro "text" es requerido',
          HttpStatus.BAD_REQUEST
        );
      }
      
      const response = await this.tcpClientService.reverseString(query.text);
      
      if (response.status === 'error') {
        throw new HttpException(response.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return response;
    } catch (error) {
      this.logger.error(`❌ Error en endpoint /reverse: ${error.message}`);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        'Error de comunicación con el servidor TCP',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
} 