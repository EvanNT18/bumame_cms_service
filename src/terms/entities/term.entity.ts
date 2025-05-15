import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Partner } from 'src/partners/entities/partner.entity';
import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';

@Entity('terms')
export class Term extends BaseEntityExtended {
  @Column('text', { name: 'text' })
  text: string;

  @ManyToOne(() => Partner, (partner) => partner.terms)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;
}
