import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Services } from './service.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Services, (service) => service.category)
  services: Services[];
}
