import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';

@Entity('subtitles')
export class Subtitle extends BaseEntityExtended {
    @Column('text', { name: 'text' })
    text: string;

    // @ManyToOne(() => Partner, partner => partner.subtitles)
    // @JoinColumn({ name: 'partner_id' })
    // partner: Partner;
}