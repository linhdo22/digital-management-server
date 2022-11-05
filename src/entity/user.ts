import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
