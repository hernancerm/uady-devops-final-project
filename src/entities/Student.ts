import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  enrollment_id: number;

  @Column()
  first_names: string;

  @Column()
  last_names: string;

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({
    name: "course_id",
  })
  course: Course;
}
