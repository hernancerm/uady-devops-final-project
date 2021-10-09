import { User } from "../entities/User";
import bcrypt from "bcrypt";

import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
