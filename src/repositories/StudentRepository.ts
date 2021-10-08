import { EntityRepository, Repository } from "typeorm";
import { Student } from "../entities/Student";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {}
