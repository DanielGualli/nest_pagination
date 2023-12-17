import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profesores } from "./profesores.entity";

@Entity()
export class Alumno {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('text')
    nombre:string;

    @Column('int',{
        default:0,
    })
    edad:number;

    @Column('text',{
        unique:true,
    })
    materia:string;

    @Column('text',{
        array:true,
        default:[],
    })
    dias:string[];


    @OneToMany(
        ()=>Profesores,
        (profesores)=>profesores.alumno,
    {
        cascade:true,
        eager:true
    }
    )
    nombresprofesores?:Profesores[]
}
