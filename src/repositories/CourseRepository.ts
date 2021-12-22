import { Course } from "../entities/Course";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {}
