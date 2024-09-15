import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

@Post('orthography-check') 
orthographyCheck(
  @Body() orthographyDto:OrthographyDto,
) {
    // return orthographyDto;
  return this.gptService.orthograpthyCheck(orthographyDto);
}


@Post('pros-cons-discusser') 
prosConsDiscusser(
  @Body() prosConsDiscusserDto:ProsConsDiscusserDto,
) {
    // return orthographyDto;
  return this.gptService.prosconsDiscusser(prosConsDiscusserDto);
}

@Post('pros-cons-discusser-stream') 
 async prosConsDiscusserStream(
  @Body() prosConsDiscusserDto:ProsConsDiscusserDto,
  @Res() res: Response,
) {
    // return orthographyDto;
 const stream = await this.gptService.prosconsDiscusserStream(prosConsDiscusserDto);
 res.setHeader('Content-Type', 'application/json')
 res.status(HttpStatus.OK);

 for await(const chunk of stream) { 
  const piece = chunk.choices[0].delta.content || '';
  // console.log(piece);
  res.write(piece)
 }
res.end();

}
}



