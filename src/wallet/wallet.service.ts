import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WalletService {

    constructor(@InjectRepository(Wallet) private repo: Repository<Wallet>,
        private userService: UsersService) { }

    async addCredits(userId: number, addCreditDto): Promise<Wallet> {
        const [user, wallet] = await Promise.all([
            this.userService.findOne(userId),
            this.findOne(userId),
        ]);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        wallet.balance = Number(wallet.balance) + addCreditDto.amount;
        return await this.repo.save(wallet);
    }

    async findOne(userId: number): Promise<Wallet> {
        const userWallet = await this.repo.findOne({ where: { userId } });
        if (!userWallet) {
            throw new NotFoundException('Wallet not found for this user');
        }
        return userWallet;
    }

    async updateBalance(userId: number, newBalance: number): Promise<Wallet> {
        const wallet = await this.findOne(userId);
        wallet.balance = newBalance;
        return await this.repo.save(wallet);
    }

}
