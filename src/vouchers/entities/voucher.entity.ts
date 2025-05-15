import BaseEntityExtended from "src/database/BaseEntityExtended.entity";
import { Partner } from "src/partners/entities/partner.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('vouchers')
export class Voucher extends BaseEntityExtended {
    @Column('varchar', { name: 'title' })
    title: string;

    @Column('varchar', { name: 'voucher_code' })
    voucherCode: string;

    @Column('text', { name: 'description' })
    description: string;

    @ManyToOne(() => Partner, partner => partner.vouchers)
    @JoinColumn({ name: 'partner_id' })
    partner: Partner;
}