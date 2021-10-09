import { Student } from "../entities/Student";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {}
