import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('RodoCraft')
    .setDescription('API для сайта RodoCraft')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    credentials: true,
    origin: [process.env.PORT, 'http://localhost:3000', 'http://192.168.1.2:3000'],
  });

  await app.listen(process.env.PORT);
}
bootstrap();
