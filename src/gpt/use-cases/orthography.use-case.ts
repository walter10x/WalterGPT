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
                content: `Te serán proveídos textos en castellano con posibles errores ortográficos y gramaticales, las palabras utilizadas deben existir y ser validadas por el diccionario de la Real Academia Española.
          Deberás corregirlos y devolver el texto corregido en formato JSON.

          Tu tarea es corregir los errores ortográficos y gramaticales para retornar información precisa y sobre todo coherente, ademas de plantear sugerencias para mejorar la redacción del texto.
          Tambien debes dar un porcentaje de acierto por el usuario, para que este pueda evaluar la corrección realizada.

          Si no hay errores debes retornar el texto original, un porcentaje de acierto del 100% y felicitar al usuario por su excelente redacción.

          Ejemplo de salida: 
          {
            userScore: number,
            errors: string[], // ['error -> solución']
            message: string, // Usa emojis y texto para felicitar o regañar al usuario
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
