import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles } from 'src/common/decorator/role. decorator';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { RoleGuard } from 'src/common/guard/role.guard';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import BaseConfig from 'src/config/base';
import { CreateCatDto } from './cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
// @UseGuards(RoleGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(
    private readonly service: CatsService,
    private readonly config: BaseConfig,
  ) {}

  @Get()
  @Roles('admin', 'god')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  @SetMetadata('roles', ['admin', 'common'])
  findOne(@Param('id', ParseIntPipe) id): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }

  @Get('one/:id')
  findOneT(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id,
    @Ip() ip: string,
  ): string {
    console.log(`${ip} need ${id}`);
    return `This action returns a #${id} cat`;
  }

  @Get('random')
  random(@Req() request: Request): string {
    return 'This action return a random cat';
  }

  @Get('docs')
  @Redirect('https://nestjs.com', 301)
  docs(@Query('version') version) {
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Post('create')
  @Header('Cache-Control', 'none')
  @SetMetadata('roles', ['admin'])
  async create(
    @Body() createCatDto: CreateCatDto,
    @Res({ passthrough: true }) response: Response,
    @Ip() ip: string,
  ) {
    const action = {
      type: HttpStatus.CREATED,
      payload: `[${ip}] create a cat [by response]`,
      env: this.config.env,
    };
    response.status(HttpStatus.CREATED);
    return action;
  }

  @Get('exception')
  @UseFilters(new HttpExceptionFilter())
  exception() {
    return this.service.exception();
  }
}
