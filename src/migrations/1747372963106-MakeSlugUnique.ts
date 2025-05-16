import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class MakeSlugUnique1747372963106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint('partners', new TableUnique({ columnNames: ['slug'] }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('partners', new TableUnique({ columnNames: ['slug'] }));
    }

}
