import { Module } from '@nestjs/common';
import { CryptoService } from 'src/shared/crypto/crypto.service';

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class SharedModule {}
