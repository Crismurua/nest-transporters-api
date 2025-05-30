import { Module } from '@nestjs/common';
import { ClientHttpController } from './client-http.controller';
import { TcpClientService } from './tcp-client.service';

@Module({
  controllers: [ClientHttpController],
  providers: [TcpClientService],
})
export class ClientHttpModule {} 