import { Body, Controller, Get, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateBalanceRequestDto } from './dto/update-balance-request.dto';
import { Response } from 'express';
import axios from 'axios';
import async from 'async';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/update_balance') async updateBalance(
    @Body() body: UpdateBalanceRequestDto,
    @Res() res: Response,
  ) {
    const updateBalanceResult = await this.usersService.updateBalance(
      body.userId,
      body.amount,
    );

    if (updateBalanceResult === true)
      return res.status(200).json({
        message: 'done',
      });

    return res.status(400).json({
      message: updateBalanceResult,
    });
  }

  @Get('/test')
  async test() {
    const messages = {};

    const arr = Array.from({ length: 10000 });

    await async.forEach(
      arr,
      async.asyncify(async () => {
        try {
          const rs = await axios.put(
            'http://localhost:3000/users/update_balance',
            {
              userId: 1,
              amount: -2,
            },
          );

          if (rs.data.message) {
            messages[rs.data.message] = messages[rs.data.message]
              ? messages[rs.data.message] + 1
              : 1;
          }
        } catch (e) {
          if (e.response.data.message) {
            messages[e.response.data.message] = messages[
              e.response.data.message
            ]
              ? messages[e.response.data.message] + 1
              : 1;
          }
        }
      }),
    );

    return messages;
  }
}
