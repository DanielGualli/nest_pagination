import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Curso{
    @PrimaryGeneratedColumn()
    id:number 
    @Column('text')
    nombre:string
}