import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFaqTable1745508751639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE faqs (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                question VARCHAR(255) NOT NULL,
                answer TEXT NOT NULL,
                category VARCHAR(100),
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
