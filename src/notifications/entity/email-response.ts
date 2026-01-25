import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { EmailNotificationStatus } from '../enum/email-sending-status.enum';
import { Order } from 'src/order/order.entity';
import { ErrorType } from '../enum/error-type';

@Entity()
export class EmailResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  success: boolean;

  @CreateDateColumn()
  createdAt: Date;
}


