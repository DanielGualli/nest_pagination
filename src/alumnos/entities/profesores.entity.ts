import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Alumno } from "./alumno.entity"

@Entity()
export class Profesores {
    @PrimaryGeneratedColumn()
    id:number
    @Column('text')
    nombres:string
    

    @ManyToOne(

        ()=>Alumno,
        (alumno)=>alumno.nombresprofesores
    )
    alumno?:Alumno
}