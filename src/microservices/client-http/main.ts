import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ClientHttpModule } from './client-http.module';
import { config } from '../../shared/utils/config';

async function bootstrap() {
  const logger = new Logger('ClientHTTP');
  
  const app = await NestFactory.create(ClientHttpModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Habilitar CORS para desarrollo
  app.enableCors();

  await app.listen(config.clientHttp.port);
  logger.log(`🚀 Microservicio Cliente HTTP ejecutándose en puerto ${config.clientHttp.port}`);
  logger.log(`📋 Endpoints disponibles:`);
  logger.log(`   GET http://localhost:${config.clientHttp.port}/ping`);
  logger.log(`   GET http://localhost:${config.clientHttp.port}/time`);
  logger.log(`   GET http://localhost:${config.clientHttp.port}/reverse?text=hola`);
}

bootstrap().catch((error) => {
  console.error('Error al iniciar el microservicio cliente HTTP:', error);
  process.exit(1);
}); 