// utils/pinata-config.ts (Server-only config)
import PinataSDK from '@pinata/sdk';

export const pinata = new PinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY
});