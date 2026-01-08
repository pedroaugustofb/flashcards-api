import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import { CustomValidationPipe } from './infra/validation-pipe/CustomValidationPipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // this pipe will automatically transform the payload into a DTO instance
  app.useGlobalPipes(new CustomValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('API title')
    .setDescription('API Description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const port = process.env.PORT || 8080

  const logger = new Logger()

  await app.listen(port, () => logger.debug(`Server is running on: ${port}`))
}
bootstrap()
