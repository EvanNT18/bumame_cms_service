import BaseEntityExtended from 'src/database/BaseEntityExtended.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('voucher_previews')
export class VoucherPreview extends BaseEntityExtended {
  @Column('text', { name: 'preview_data' })
  previewData: string;

  @Index('IDX_VOUCHER_PREVIEW_SESSION_ID')
  @Column('varchar', { name: 'session_id', length: 255 })
  sessionId: string;

  @Column('timestamp', { name: 'expires_at' })
  expiresAt: Date;
} 