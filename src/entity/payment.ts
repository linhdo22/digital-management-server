import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  cost: number;

  @Column({ type: "timestamp", nullable: true })
  created: string;

  @Column({ type: "timestamp", nullable: true })
  paidTime: string;

  @Column({ default: false })
  isPaid: boolean;
}
