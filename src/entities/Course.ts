import { IsNotEmpty, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  courseTagId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  professorName: string;

  @OneToMany(() => Student, (student) => student.course, {
    cascade: ["insert", "update"],
  })
  students: Student[];
}
