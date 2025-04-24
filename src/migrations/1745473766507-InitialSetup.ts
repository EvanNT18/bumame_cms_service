import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1745473766507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE banners (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              image_url VARCHAR(512) NOT NULL,
              is_active BOOLEAN NOT NULL DEFAULT false,
              order_position INTEGER NOT NULL,
              created_at TIMESTAMP NOT NULL DEFAULT now(),
              updated_at TIMESTAMP NOT NULL DEFAULT now()
            );
          `);

          await queryRunner.query(`
            CREATE TABLE subtitles (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              key VARCHAR(50) NOT NULL UNIQUE,
              text TEXT NOT NULL,
              created_at TIMESTAMP NOT NULL DEFAULT now(),
              updated_at TIMESTAMP NOT NULL DEFAULT now()
            );
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE banners;`);
        await queryRunner.query(`DROP TABLE subtitles;`);
    }

}
