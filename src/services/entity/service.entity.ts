// service.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Types } from './type.entity';
import { Pricing } from './pricing.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 🔗 Category
  @ManyToOne(() => Category, category => category.services)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;

  // 🔗 Type
  @ManyToOne(() => Types, type => type.services)
  @JoinColumn({ name: 'type_id' })
  type: Types;

  @Column()
  type_id: number;

  @OneToMany(() => Pricing, pricing => pricing.service)
  pricing: Pricing[];
    static pricing: any;
}
