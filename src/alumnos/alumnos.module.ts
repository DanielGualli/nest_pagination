import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';
import { Profesores } from './entities/profesores.entity';
//import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AlumnosController],
  providers: [AlumnosService],
  imports:[
    //ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Alumno, Profesores])
  ],
})
export class AlumnosModule {}


