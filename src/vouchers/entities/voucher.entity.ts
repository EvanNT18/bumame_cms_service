import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';
import { Partner } from 'src/partners/entities/partner.entity';
import { Term } from 'src/terms/entities/term.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('vouchers')
export class Voucher extends BaseEntityExtended {
  @Column('varchar', { name: 'title' })
  title: string;

  @Column('varchar', { name: 'voucher_code' })
  voucherCode: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('varchar', { name: 'slug', unique: true })
  slug: string;

  // 🔥 Kolom Baru
  @Column({
    type: 'enum',
    enum: ['wa', 'custom'],
    name: 'typeLink',
    default: 'wa',
    select: true,
  })
  typeLink: 'wa' | 'custom';

  @Column({
    type: 'text',
    name: 'link',
    nullable: true,
  })
  link: string | null;
  // -----

  @OneToMany(() => Term, (term) => term.voucher)
  terms: Term[];

  @ManyToOne(() => Partner, (partner) => partner.vouchers, {
    cascade: true,
  })
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;
}