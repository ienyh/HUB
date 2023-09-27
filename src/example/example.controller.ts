import { Controller, Get } from '@nestjs/common';

@Controller({
  host: 'localhost',
  path: 'example',
})
export class ExampleController {
  @Get()
  index(): string {
    return 'Example Page';
  }
}
