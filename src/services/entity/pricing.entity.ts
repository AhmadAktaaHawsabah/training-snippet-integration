import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Services } from './service.entity';

@Entity()
export class Pricing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  price: number;

  @Column()
  duration: string;


  @ManyToOne(() => Services, service => service.pricing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'serviceId' })
  service: Services;

  @Column()
  service_id: number;

}
