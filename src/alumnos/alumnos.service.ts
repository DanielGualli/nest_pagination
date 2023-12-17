import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { Profesores } from './entities/profesores.entity';


@Injectable()
export class AlumnosService {

    constructor(
        @InjectRepository(Alumno)
        private readonly producRepository:Repository<Alumno>,
        @InjectRepository(Profesores)
        private readonly profesoresRepository:Repository<Profesores>,

        ){}

  async create(createAlumnoDto: CreateAlumnoDto) {
    try {
      const {nombresprofesores=[], ...alumnoDetalles} = createAlumnoDto

      const alumnos = this.producRepository.create(
        {
          ...alumnoDetalles,
          nombresprofesores:nombresprofesores.map(nombresprofesores=>this.profesoresRepository.create({nombres:nombresprofesores}))
        }
      );
      await this.producRepository.save(alumnos);
      return {...alumnos, nombresprofesores};

    }catch (error) {
      console.log(error)
      throw new Error("No se pudo realizar el ingreso a la bdd");

    }
  }

  async findAll(paginacionDto: PaginacionDto) {
    const {limit=10, offset=1 } = paginacionDto;
    const alumnos = await this.producRepository.find({
      take: limit,
      skip: offset,
      relations:{
        nombresprofesores:true
      }
    })
    
    return alumnos.map( Alumno=>(
      {
        ...Alumno,
        nombresprofesores:Alumno.nombresprofesores.map(nombrep=>nombrep.nombres)
      }
    ))
    //return this.producRepository.find({});
  }

  async findOne(id: number) {
    const alumnos = await this.producRepository.findOneBy({id});

    if (!alumnos)
    throw new NotFoundException(id)
    return alumnos;
  }

  

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const alumnos = await this.producRepository.preload({
      id:id,
      ...updateAlumnoDto,
      nombresprofesores:[],
    })
  }

  remove(id: number) {
    return `This action removes a #${id} alumno`;
  }
}




