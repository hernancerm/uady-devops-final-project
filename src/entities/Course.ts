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
  course_name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  course_tag_id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  professor_name: string;

  @OneToMany(() => Student, (student) => student.course, {
    cascade: ["insert", "update"],
  })
  students: Student[];
}
