import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';
import { Voucher } from 'src/vouchers/entities/voucher.entity';

@Entity('terms')
export class Term extends BaseEntityExtended {
  @Column('text', { name: 'text' })
  text: string;

  @ManyToOne(() => Voucher, (voucher) => voucher.terms)
  @JoinColumn({ name: 'voucher_id' })
  voucher: Voucher;
}
