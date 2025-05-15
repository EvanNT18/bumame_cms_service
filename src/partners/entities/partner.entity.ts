import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('partners')
export class Partner extends BaseEntityExtended {
    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'logo_url' })
    logoUrl: string;

    @Column('varchar', { name: 'slug' })
    slug: string;

    // @OneToMany(() => Voucher, voucher => voucher.partner)
    // vouchers: Voucher[];

    // @OneToMany(() => Banner, banner => banner.partner)
    // banners: Banner[];

    // @OneToMany(() => Faq, faq => faq.partner)
    // faqs: Faq[];

    // @OneToMany(() => Subtitle, subtitle => subtitle.partner)
    // subtitles: Subtitle[];

    // @OneToMany(() => Term, term => term.partner)
    // terms: Term[];
}