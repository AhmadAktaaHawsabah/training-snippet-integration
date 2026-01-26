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

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  category_id: number;

  @ManyToOne(() => Types, (type) => type.services)
  @JoinColumn({ name: 'typeId' })
  type: Types;

  @Column()
  typeId: number;

  @OneToMany(() => Pricing, (pricing) => pricing.service)
  pricing: Pricing[];
}
