import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';
import { Partner } from 'src/partners/entities/partner.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('banners')
export class Banner extends BaseEntityExtended {
  @Column('varchar', { name: 'filename' })
  filename: string;

  @ManyToOne(() => Partner, (partner) => partner.banners)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;
}
