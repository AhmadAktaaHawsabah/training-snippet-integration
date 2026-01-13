import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  // One wallet per user
  @Index({ unique: true })
  @Column()
  userId: number;

  // The database may return it as a string to ensure accuracy.
  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP',})
  updatedAt: Date;
}
