import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Partner } from './Partner';
import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';

@Entity('faqs')
export class Faq extends BaseEntityExtended {

    @Column('text', { name: 'question' })
    question: string;

    @Column('text', { name: 'answer' })
    answer: string;

    // @ManyToOne(() => Partner, partner => partner.faqs)
    // @JoinColumn({ name: 'partner_id' })
    // partner: Partner;
}