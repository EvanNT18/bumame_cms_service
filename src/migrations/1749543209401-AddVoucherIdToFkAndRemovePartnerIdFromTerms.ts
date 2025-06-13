import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddVoucherIdToFkAndRemovePartnerIdFromTerms1749543209401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('terms', new TableColumn({
            name: 'voucher_id',
            type: 'uuid',
            isNullable: true,
        }));

        // Step 2: Create foreign key to vouchers.id
        await queryRunner.createForeignKey('terms', new TableForeignKey({
            columnNames: ['voucher_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vouchers',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));

        // Step 3: Drop the partner_id column (will drop its FK too)
        await queryRunner.dropColumn('terms', 'partner_id');
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('terms', new TableColumn({
            name: 'partner_id',
            type: 'uuid',
            isNullable: false,
        }));

        // Step 2: Recreate foreign key to partners.id
        await queryRunner.createForeignKey('terms', new TableForeignKey({
            columnNames: ['partner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'partners',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        }));

        // Step 3: Drop voucher_id and its foreign key
        await queryRunner.dropForeignKey('terms', 'terms_voucher_id_fkey'); // Ganti jika nama beda
        await queryRunner.dropColumn('terms', 'voucher_id');
    }

}
