import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { User } from './user.entity';
import { Op } from 'sequelize';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async onModuleInit() {
    // Check if no user is found, create a new user with id 1 and balance 10000
    await this.usersRepository.findOrCreate({
      where: {
        id: 1,
      },
      //
      defaults: {
        balance: 10000,
      },
    });
  }

  async create(balance: number) {
    return await this.usersRepository.create({ balance });
  }

  async updateBalance(userId: number, amount: number) {
    // Validate user
    if (!userId) {
      return 'invalid-user';
    }

    // Validate amount
    if (isNaN(amount)) {
      return 'invalid-amount';
    }
    // Check if user exists
    const user = await this.usersRepository.findByPk(userId);
    if (!user) return 'user-not-found';

    // Define result variable
    let result: any;
    try {
      if (amount < 0) {
        result = await this.usersRepository.decrement(
          {
            balance: Math.abs(amount),
          },
          {
            where: {
              id: user.id,
              balance: {
                [Op.gte]: Math.abs(amount),
              },
            },
          },
        );
      } else {
        result = await this.usersRepository.increment(
          {
            balance: amount,
          },
          {
            where: {
              id: user.id,
            },
          },
        );
      }

      // Validate result
      if (!Array.isArray(result)) throw new Error('unexpected-error');
      if (typeof result[0][1] !== 'number') throw new Error('unexpected-error');

      // Check if process is successful but no row is affected: insufficient balance
      if (result[0][1] === 0) {
        return 'insufficient-balance';
      }

      return true;
    } catch (e) {
      return e.message;
    }
  }
}
