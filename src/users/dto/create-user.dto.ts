import { createZodDto } from '@abitia/zod-dto';
import { IsString, IsNumber, IsNotEmpty, Max, IsEmail } from 'class-validator';
import { z } from 'zod'



export const createUserSchema =  z.object({
    name: z.string().nonempty('O nome é obrigatorio'),
    password: z.string().min(6, 'Minimo de 6 caracteres'),
    age: z.number({
        required_error: 'O campo idade é obrigatório',
        invalid_type_error: 'Caracteres inseridos são invalidos'
    }).min(18, "Idade minima é de 18 anos").max(100),
    email: z.string().nonempty('O email é obrigatorio').email('Formato do email é invalido'),
}).required()

export class CreateUserDto extends createZodDto(createUserSchema) {}


// {
//     @IsString()
//     @IsNotEmpty()
//     name: string
    
//     @IsString()
//     @IsNotEmpty()
//     password: string

//     @IsNumber()
//     @Max(100)
//     age: number

//     @IsEmail()
//     email: string


// }

