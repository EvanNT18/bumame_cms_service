import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeImageUrlToFilename1747364068611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners" RENAME COLUMN "image_url" TO "filename"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners" RENAME COLUMN "filename" TO "image_url"`);
    }

}
