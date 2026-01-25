import { Entity, Column, CreateDateColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { notificationPreference } from "./enum/notification_preference";
import { User } from "src/users/users.entity";

@Entity()
export class UsersSettings {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: notificationPreference })
    notificationPreference: notificationPreference;

    @Column()
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}


