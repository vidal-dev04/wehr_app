import { Controller, Post, Body } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Controller('hash')
export class HashPasswordController {
  @Post('generate')
  async generateHash(@Body() body: { password: string }) {
    const hash = await bcrypt.hash(body.password, 10);
    return {
      password: body.password,
      hash: hash
    };
  }
}
