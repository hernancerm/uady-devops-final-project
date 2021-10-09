import { Student } from "../entities/Student";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {}
