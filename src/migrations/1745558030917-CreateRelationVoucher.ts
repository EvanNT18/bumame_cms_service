import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationVoucher1745558030917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vouchers
            ADD COLUMN banner_id UUID REFERENCES banners(id),
            ADD COLUMN subtitle_id UUID REFERENCES subtitles(id),
            ADD COLUMN terms_and_conditions_id UUID REFERENCES terms_and_conditions(id);
        `);

        await queryRunner.query(`
            CREATE TABLE voucher_faqs (
                voucher_id UUID REFERENCES vouchers(id) ON DELETE CASCADE,
                faq_id UUID REFERENCES faqs(id) ON DELETE CASCADE,
                PRIMARY KEY (voucher_id, faq_id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE voucher_faqs`);
        await queryRunner.query(`
            ALTER TABLE vouchers
            DROP COLUMN banner_id,
            DROP COLUMN subtitle_id,
            DROP COLUMN terms_and_conditions_id;
        `);
    }

}
