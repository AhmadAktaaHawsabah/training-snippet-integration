import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Services } from './service.entity';

@Entity()
export class Types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Services, (service) => service.type)
  services: Services[];
}
