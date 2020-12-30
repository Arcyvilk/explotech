import crypto from 'crypto';

export const hash = input =>
  crypto.createHash('sha256').update(input).digest('hex');
