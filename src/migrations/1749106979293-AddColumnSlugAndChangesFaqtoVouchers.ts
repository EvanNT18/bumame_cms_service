import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnSlugAndChangesFaqtoVouchers1749106979293 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vouchers', new TableColumn({
            name: 'slug',
            type: 'varchar',
            isUnique: true,
            isNullable: false
            
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vouchers', 'slug');
    }
}