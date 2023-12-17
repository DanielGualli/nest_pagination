import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateAlumnoDto {


    @IsString()
    @IsOptional()
    nombre?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    @Type( ()=> Number )
    edad?: number;

    @IsString()
    @IsOptional()
    materia?: string;

    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    dias?: string;

    @IsString({ each: true})
    @IsArray()
    @IsOptional()
    nombresprofesores?: string;
    
}
