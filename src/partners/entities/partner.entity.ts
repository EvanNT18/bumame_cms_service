import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';
import { Voucher } from 'src/vouchers/entities/voucher.entity';
import { Faq } from 'src/faqs/entities/faq.entity';
import { Subtitle } from 'src/subtitles/entities/subtitle.entity';
import { Term } from 'src/terms/entities/term.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Banner } from 'src/banners/entities/banner.entity';

@Entity('partners')
export class Partner extends BaseEntityExtended {
  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'logo_filename' })
  logoFilename: string;

  @Column('varchar', { name: 'slug', unique: true })
  slug: string;

  @OneToMany(() => Voucher, (voucher) => voucher.partner)
  vouchers: Voucher[];

  @OneToMany(() => Banner, (banner) => banner.partner)
  banners: Banner[];

  @OneToMany(() => Faq, (faq) => faq.partner)
  faqs: Faq[];

  @OneToMany(() => Subtitle, (subtitle) => subtitle.partner)
  subtitles: Subtitle[];
}