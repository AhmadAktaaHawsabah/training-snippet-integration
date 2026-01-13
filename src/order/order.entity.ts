import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from './enums/order-status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  // price at time of order
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date | null;
}