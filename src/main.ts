import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import ExceptionHandler from './middleware/exception.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   
  const config = new DocumentBuilder()
  .setTitle('Task Tracking')
  .setDescription('Task Tracking')
  .setVersion('1.0')
  .addTag('endpoints')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
	
  app.useGlobalFilters(new ExceptionHandler());

  await app.listen(3000);
}
bootstrap();
