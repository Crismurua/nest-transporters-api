import { Module } from '@nestjs/common';
import { ServerTcpController } from './server-tcp.controller';
import { ServerTcpService } from './server-tcp.service';

@Module({
  controllers: [ServerTcpController],
  providers: [ServerTcpService],
})
export class ServerTcpModule {} 