import { TableColumn } from "typeorm";

export function baseEntityColumns() {
    return [
        new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
        }),
        new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
        }),
        new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
        }),
        new TableColumn({
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
        })
    ];
}