import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './entities/voucher.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Partner } from 'src/partners/entities/partner.entity';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
    @InjectRepository(Voucher)
    private vouchersRepository: Repository<Voucher>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto) {
    const { partnerId, ...voucherData } = createVoucherDto;

    const partner = await this.partnersRepository
      .findOneByOrFail({ id: partnerId })
      .catch(() => {
        throw new NotFoundException(`Partner with id ${partnerId} not found`);
      });

    await this.vouchersRepository
      .create({
        ...voucherData,
        partner,
      })
      .save();

    return {
      message: `Voucher created successfully`,
    };
  }

  async index(options: IPaginationOptions) {
    const queryBuilder = this.vouchersRepository.createQueryBuilder('voucher');

    queryBuilder.leftJoinAndSelect('voucher.partner', 'partner');

    return paginate<Voucher>(queryBuilder, options);
  }

  async findOne(id: string) {
    return this.vouchersRepository
      .findOneOrFail({ where: { id }, relations: ['partner'] })
      .catch(() => {
        throw new NotFoundException(`Voucher with id ${id} not found`);
      });
  }

  async update(id: string, updateVoucherDto: UpdateVoucherDto) {
    const { partnerId, ...voucherData } = updateVoucherDto;

    const oldVoucher = await this.findOne(id);

    let partner = oldVoucher.partner;
    if (partnerId) {
      partner = await this.partnersRepository
        .findOneByOrFail({ id: partnerId })
        .catch(() => {
          throw new NotFoundException(`Partner with id ${partnerId} not found`);
        });
    }

    await this.vouchersRepository.update(id, { ...voucherData, partner });

    return {
      message: `Voucher updated successfully`,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.vouchersRepository.softDelete(id);

    return;
  }
}
