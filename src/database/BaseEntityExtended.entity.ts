import {
  BaseEntity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class BaseEntityExtended extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @DeleteDateColumn({ select: false })
  deleted_at: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
