import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger/dist/decorators';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  swagger(@Res() res): string {
    return res.redirect('/api');
  }
}
