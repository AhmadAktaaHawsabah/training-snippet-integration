import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreteCreditDto {

    @IsNumber()
    userId: number;
    
    balance: number;

}

