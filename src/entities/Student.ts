import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TODO: Add entity validation
@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  enrollmentId: number;

  @Column()
  firstNames: string;

  @Column()
  lastNames: string;

  @Column()
  birthDate: Date;

  @Column()
  sex: "M" | "F";

  @Column()
  enrollmentDate: Date;
}
