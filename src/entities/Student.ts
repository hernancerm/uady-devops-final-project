import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  enrollment_id: number;

  @Column()
  first_names: string;

  @Column()
  last_names: string;
}
