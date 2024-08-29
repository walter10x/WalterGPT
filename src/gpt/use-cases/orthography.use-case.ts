import OpenAI from "openai";

interface Options { 
    prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => { 
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 100,
        messages: [
            { 
                role: "system", 
                content: `Eres un corrector ortográfico y gramatical debes retornar un JSON. Corrige los errores del texto que se te proporciona.
                Si no hay errores, debes felicitar al usuario con un mensaje alegre y utilizando emojis.
                
                Formato de salida esperado:
                {
                    userScore: number,
                    errors: string[], // ['error => solución']
                    message: string // usa emojis y texto para felicitar al usuario si no hay errores
                }`
            },
            { 
                role: "user",
                content: prompt,
            }
        ],
    });
 
    const jsonResp =JSON.parse(completion.choices[0].message.content)
    return  jsonResp
}
