import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSubtitle1747192800086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE subtitle (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE subtitle;`);
  }

}
