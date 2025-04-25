// src/voucher/entities/voucher.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BeforeInsert, JoinColumn } from 'typeorm';
import { Banner } from '../../banner/entities/banner.entity';
import { Subtitle } from '../../subtitle/entities/subtitle.entity';

import { Faq } from '../../faq/entities/faq.entity';
import { TermsAndConditions } from 'src/terms-and-conditions/entities/terms-and-condition.entity';
import { Type } from 'class-transformer';

@Entity('vouchers')
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ unique: true })
  slug: string; 

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Banner, { eager: true }) // atau lazy: false
  @JoinColumn({ name: 'banner_id' })
  banner: Banner;

  @ManyToOne(() => Subtitle, { eager: true })
  @JoinColumn({ name: 'subtitle_id' })
  subtitle: Subtitle;

  @ManyToOne(() => TermsAndConditions, { eager: true })
  @JoinColumn({ name: 'terms_and_conditions_id' })
  terms_and_conditions: TermsAndConditions;

  @ManyToMany(() => Faq, { eager: true })
  @JoinTable({
    name: 'voucher_faqs',
    joinColumn: { name: 'voucher_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'faq_id', referencedColumnName: 'id' }
  })
  faqs: Faq[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeInsert()
  generateSlug() {
    if (!this.slug) {
      this.slug = this.code.toLowerCase().replace(/_/g, '-');
    }
  }
}