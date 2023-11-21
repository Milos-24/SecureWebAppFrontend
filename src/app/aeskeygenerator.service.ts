import { Injectable } from '@angular/core';

@Injectable()
export class AesKeyGeneratorService {

  generateAesKey(): Promise<{ publicKey: string, privateKey: string }> {
    return window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256, // 256 bits
      },
      true, // can extract the key
      ['encrypt', 'decrypt']
    )
    .then(keyPair => {
      return window.crypto.subtle.exportKey('raw', keyPair)
        .then(keyData => {
          const publicKey = this.arrayBufferToBase64(keyData);
          const privateKey = this.arrayBufferToBase64(keyData);
          return { publicKey, privateKey };
        });
    });
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(buffer);
    let binary = '';
    uint8Array.forEach((value) => {
      binary += String.fromCharCode(value);
    });
    return btoa(binary);
  }
}
