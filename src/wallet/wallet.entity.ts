import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Wallet {

    // don`t repeat id definition make a super class and extend it wherever needed

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId'})
    user: User;

    @Column({ type: 'decimal', default: 0 })
    balance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}


