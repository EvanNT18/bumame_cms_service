import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('faqs')
  export class Faq {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 255 })
    question: string;
  
    @Column('text')
    answer: string;
  
    @Column({ length: 100, nullable: true })
    category: string;
  
    @Column({ default: true })
    is_active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }