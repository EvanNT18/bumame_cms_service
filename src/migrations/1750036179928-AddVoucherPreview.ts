import { baseEntityExtendedColumns } from 'src/utils/database';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AddVoucherPreview1750036179928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create voucher_previews table
    await queryRunner.createTable(
      new Table({
        name: 'voucher_previews',
        columns: [
          ...baseEntityExtendedColumns(),
          new TableColumn({
            name: 'preview_data',
            type: 'text',
            comment: 'JSON string containing voucher preview data',
          }),
          new TableColumn({
            name: 'session_id',
            type: 'varchar',
            length: '255',
            comment: 'Session ID to identify the preview',
          }),
          new TableColumn({
            name: 'expires_at',
            type: 'timestamp',
            comment: 'Expiration time for the preview data',
          }),
        ],
        indices: [
          {
            name: 'IDX_VOUCHER_PREVIEW_SESSION_ID',
            columnNames: ['session_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('voucher_previews');
  }
}
