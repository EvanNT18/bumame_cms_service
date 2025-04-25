import { Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'image_url', length: 512 })
  @Transform(({ value }) =>
    "hmmm"
  )
  imageUrl: string; 

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'order_position', type: 'int' })
  orderPosition: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
    vouchers: any;

  constructor(partial?: Partial<Banner>) {
    Object.assign(this, partial);
  }
}