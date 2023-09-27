import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { CreateCatDto } from './cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private service: CatsService) {}

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
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
  ): string {
    console.log(id);
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
  async create(
    @Body() createCatDto: CreateCatDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const action = {
      type: HttpStatus.CREATED,
      payload: 'This action create a cat [by response]',
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
