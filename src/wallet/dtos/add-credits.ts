import { IsNumber, IsPositive,  Min } from 'class-validator';

export class AddCreditDto {

    @IsNumber()
    @IsPositive({ message: 'Amount must be positive' })
    @Min(0.01, { message: 'Amount must be at least 0.01' })
    amount: number

}
