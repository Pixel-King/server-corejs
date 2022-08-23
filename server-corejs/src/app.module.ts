import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CryptoService } from './shared/crypto/crypto.service';
import { SharedModule } from './shared/shared.module';
import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION || ''),
    UsersModule,
    AuthModule,
    PassportModule,
    SharedModule,
    JwtModule.register({
      secret: process.env.PRIVATE_JWT_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService, JwtStrategy],
})
export class AppModule {}
