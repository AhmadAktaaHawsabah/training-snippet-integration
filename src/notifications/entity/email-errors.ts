import { Entity , PrimaryGeneratedColumn , Column , OneToOne ,JoinColumn, CreateDateColumn} from "typeorm";
import { EmailResponse } from "./email-response";
import { ErrorType } from "../enum/error-type" ;

@Entity()
export class EmailError {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => EmailResponse, { onDelete: 'CASCADE' })
  @JoinColumn()
  response: EmailResponse;

  @Column()
  statusCode: number;

  @Column({ type: 'enum', enum: ErrorType })
  errorType: ErrorType;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
