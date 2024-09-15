import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, ProsConsDiscusserStreamUseCase, ProsConsDiscusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openai = new OpenAI({
       apiKey:process.env.OPENAI_API_KEY,
    })

 async orthograpthyCheck(orthographyDto:OrthographyDto) { 
    return await orthographyCheckUseCase(this.openai,{
        prompt: orthographyDto.prompt
    });
    
}

async prosconsDiscusser({prompt}: ProsConsDiscusserDto){
    return await ProsConsDiscusserUseCase(this.openai, {prompt});
}
async prosconsDiscusserStream({prompt}: ProsConsDiscusserDto){
    return await ProsConsDiscusserStreamUseCase(this.openai, {prompt});
}

}
