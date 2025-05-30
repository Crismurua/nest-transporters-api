import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ReverseStringDto {
  @IsString({ message: 'El texto debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El texto no puede estar vacío' })
  @MaxLength(1000, { message: 'El texto no puede exceder 1000 caracteres' })
  text: string;
} 