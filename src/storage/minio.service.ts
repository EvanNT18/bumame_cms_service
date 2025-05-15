import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT')!,
      port: +this.configService.get<string>('MINIO_PORT')!,
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY')!,
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY')!,
    });

    this.bucketName = this.configService.get<string>('MINIO_BUCKET_NAME')!;
    this.createBucketIfNotExists();
  }

  private async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<string> {
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype,
      },
    );
    return fileName;
  }

  async getFileUrl(fileName: string): Promise<string> {
    return this.minioClient.presignedUrl(
      'GET',
      this.bucketName,
      fileName,
      24 * 60 * 60, // URL berlaku 24 jam
    );
  }

  private extractFileName(urlOrName: string): string {
    if (!urlOrName.includes('http')) return urlOrName;

    const raw = decodeURIComponent(urlOrName);
    const parts = raw.split('/');
    const lastSegment = parts[parts.length - 1];
    return lastSegment.split('?')[0];
  }

  async deleteFile(urlOrName: string): Promise<void> {
    const fileName = this.extractFileName(urlOrName);
    await this.minioClient.removeObject(this.bucketName, fileName);
  }
}
