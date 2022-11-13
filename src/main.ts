import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WWW')
    .setDescription('this is not a pyramid')
    .setVersion('1.0.0')
    .addTag('WWW')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
