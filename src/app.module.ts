import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno desde el archivo .env
    GptModule
  ]
})
export class AppModule {}
