import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { providers } from './providers/providers';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {
  static register(props: any = {}) {
    const ConfigModuleInit = ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    });

    return {
      module: AppModule,
      imports: [ConfigModuleInit],
      providers: providers,
      controllers: [],
      exports: [],
    };
  }
}
