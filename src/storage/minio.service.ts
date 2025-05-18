import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;

  public BANNERS_BUCKET: string;
  public PARTNER_LOGOS_BUCKET: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT')!,
      port: +this.configService.get<string>('MINIO_PORT')!,
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY')!,
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY')!,
    });

    this.BANNERS_BUCKET = this.configService.get<string>(
      'MINIO_BANNERS_BUCKET_NAME',
    )!;

    this.PARTNER_LOGOS_BUCKET = this.configService.get<string>(
      'MINIO_PARTNER_LOGOS_BUCKET_NAME',
    )!;
  }

  async uploadFile(
    file: Buffer<ArrayBufferLike>,
    filename: string,
    bucketName: string,
  ): Promise<void> {
    this.minioClient.putObject(bucketName, filename, file);
  }

  async getFileUrl(fileName: string, bucketName: string): Promise<string> {
    return this.minioClient.presignedUrl(
      'GET',
      bucketName,
      fileName,
      24 * 60 * 60, // URL berlaku 24 jam
    );
  }

  async deleteFile(urlOrName: string, bucketName: string): Promise<void> {
    const fileName = this.extractFileName(urlOrName);
    await this.minioClient.removeObject(bucketName, fileName);
  }

  private extractFileName(urlOrName: string): string {
    if (!urlOrName.includes('http')) return urlOrName;

    const raw = decodeURIComponent(urlOrName);
    const parts = raw.split('/');
    const lastSegment = parts[parts.length - 1];
    return lastSegment.split('?')[0];
  }
}
