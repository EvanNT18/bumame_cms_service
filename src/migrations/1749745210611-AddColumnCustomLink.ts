import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCustomLink1749745210611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     // 1. Buat ENUM type untuk type_link
    await queryRunner.query(`
      CREATE TYPE link_type AS ENUM ('wa', 'custom');
    `);

    // 2. Tambahkan kolom typeLink dengan tipe link_type
    await queryRunner.query(`
      ALTER TABLE "vouchers"
      ADD COLUMN "typeLink" link_type NOT NULL DEFAULT 'wa';
    `);

    // 3. Tambahkan kolom link (TEXT nullable)
    await queryRunner.query(`
      ALTER TABLE "vouchers"
      ADD COLUMN "link" TEXT;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Hapus kolom link
    await queryRunner.query(`
      ALTER TABLE "vouchers"
      DROP COLUMN "link";
    `);

    // 2. Hapus kolom typeLink
    await queryRunner.query(`
      ALTER TABLE "vouchers"
      DROP COLUMN "typeLink";
    `);

    // 3. Hapus ENUM type
    await queryRunner.query(`
      DROP TYPE IF EXISTS link_type;
    `);
    }

}
