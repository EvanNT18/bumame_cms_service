
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn 
  } from 'typeorm';
  
  @Entity('vouchers')
  export class Voucher {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 20, unique: true })
    code: string;
  
    @Column({ unique: true })
    slug: string;
  
    @Column({ default: true })
    is_active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @BeforeInsert()
    generateSlug() {
      if (!this.slug) {
        this.slug = this.code.toLowerCase().replace(/_/g, '-');
      }
    }
  }