import { EntityTarget, TableColumn } from 'typeorm';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import dataSource from 'src/data-source';

export function baseEntityExtendedColumns() {
  return [
    new TableColumn({
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      isGenerated: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    }),
    new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()',
    }),
    new TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()',
    }),
    new TableColumn({
      name: 'deleted_at',
      type: 'timestamp',
      isNullable: true,
    }),
  ];
}
