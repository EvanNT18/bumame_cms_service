import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Partner } from 'src/partners/entities/partner.entity';
import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';

@Entity('faqs')
export class Faq extends BaseEntityExtended {
  @Column('text', { name: 'question' })
  question: string;

  @Column('text', { name: 'answer' })
  answer: string;

  @Column('uuid', { nullable: false }) 
  partnerId: string;

  @ManyToOne(() => Partner, (partner) => partner.faqs)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;
}