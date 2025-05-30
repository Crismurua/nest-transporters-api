import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class QueryTextDto {
  @IsString({ message: 'El parámetro text debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El parámetro text es requerido' })
  @MaxLength(1000, { message: 'El texto no puede exceder 1000 caracteres' })
  text: string;
} 