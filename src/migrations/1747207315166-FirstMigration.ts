import { baseEntityExtendedColumns } from "src/utils/database";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class FirstMigration1747207315166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create partners table
        await queryRunner.createTable(new Table({
            name: 'partners',
            columns: [
                ...baseEntityExtendedColumns(),
                new TableColumn({
                    name: 'name',
                    type: 'varchar',
                }),
                new TableColumn({
                    name: 'logo_url',
                    type: 'varchar',
                }),
                new TableColumn({
                    name: 'slug',
                    type: 'varchar',
                })
            ]
        }));

        // Create vouchers table
        await queryRunner.createTable(new Table({
            name: 'vouchers',
            columns: [
                ...baseEntityExtendedColumns(),
                new TableColumn({
                    name: 'title',
                    type: 'varchar',
                }),
                new TableColumn({
                    name: 'voucher_code',
                    type: 'varchar',
                }),
                new TableColumn({
                    name: 'description',
                    type: 'text',
                }),
                this.partnerIdColumn(),
            ]
        }));
        await queryRunner.createForeignKey('vouchers', this.partnerIdConstraint());

        // Create banners table
        await queryRunner.createTable(new Table({
            name: 'banners',
            columns: [
                ...baseEntityExtendedColumns(),
                new TableColumn({
                    name: 'image_url',
                    type: 'varchar',
                }),
                this.partnerIdColumn(),
            ]
        }));
        await queryRunner.createForeignKey('banners', this.partnerIdConstraint());

        // Create faqs table
        await queryRunner.createTable(new Table({
            name: 'faqs',
            columns: [
                ...baseEntityExtendedColumns(),
                new TableColumn({
                    name: 'question',
                    type: 'text',
                }),
                new TableColumn({
                    name: 'answer',
                    type: 'text',
                }),
                this.partnerIdColumn(),
            ]
        }));
        await queryRunner.createForeignKey('faqs', this.partnerIdConstraint());

        // Create subtitles table
        await queryRunner.createTable(new Table({
            name: 'subtitles',
            columns: [
                ...baseEntityExtendedColumns(),
                new TableColumn({
                    name: 'text',
                    type: 'text',
                }),
                this.partnerIdColumn(),
            ]
        }));
        await queryRunner.createForeignKey('subtitles', this.partnerIdConstraint());

        // Create terms table
        await queryRunner.createTable(new Table({
            name: 'terms',
            columns: [
                ...baseEntityExtendedColumns(),
                new TableColumn({
                    name: 'text',
                    type: 'text',
                }),
                this.partnerIdColumn(),
            ]
        }));
        await queryRunner.createForeignKey('terms', this.partnerIdConstraint());
    }

    private partnerIdColumn(): TableColumn {
        return new TableColumn({
            name: 'partner_id',
            type: 'uuid',
        });
    }

    private partnerIdConstraint(): TableForeignKey {
        return new TableForeignKey({
            columnNames: ['partner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'partners',
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('subtitles');
        await queryRunner.dropTable('terms');
        await queryRunner.dropTable('faqs');
        await queryRunner.dropTable('banners');
        await queryRunner.dropTable('vouchers');
        await queryRunner.dropTable('partners');
    }

}
