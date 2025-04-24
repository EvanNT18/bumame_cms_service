import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVoucherTable1745497955202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE vouchers (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                code VARCHAR(20) UNIQUE,
                slug VARCHAR UNIQUE,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `);
      
          
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vouchers');
    }

}
