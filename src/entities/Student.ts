import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Course } from "./Course";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  enrollmentId: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  firstNames: string;

  @IsNotEmpty()
  @IsString()
  lastNames: string;

  @Column()
  @IsNotEmpty()
  birthDate: Date;

  @Column()
  @IsNotEmpty()
  @IsIn(["M", "F"])
  sex: "M" | "F";

  @Column()
  @IsNotEmpty()
  enrollmentDate: Date;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({
    name: "course_id",
  })
  course: Course;
}
