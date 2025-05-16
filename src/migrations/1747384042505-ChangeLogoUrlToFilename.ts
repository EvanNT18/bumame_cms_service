import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLogoUrlToFilename1747384042505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partners" RENAME COLUMN "logo_url" TO "logo_filename"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partners" RENAME COLUMN "logo_filename" TO "logo_url"`);
    }

}
