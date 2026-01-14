import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/users.entity';
import { OrderStatus } from './eums/order-status.enum';
import { Product } from 'src/products/products.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @ManyToOne(() => Product, (product) => product.orders, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    productId: number;

    @Column()
    amount: number;


    @Column({ type: 'enum', enum: OrderStatus })
    status: OrderStatus;


    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    approvedAt: Date ;

}
