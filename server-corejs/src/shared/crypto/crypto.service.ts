import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';

@Injectable()
export class CryptoService {
  getHash(str: string) {
    return createHmac('sha256', process.env.HASH_PRIVATE_KEY)
      .update(str)
      .digest('hex');
  }
}
