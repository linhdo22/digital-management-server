import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Membership } from "./membership";
import { AccessLevel, Role } from "./role";

@Entity()
export class UserStatus {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}

@Entity()
export class User {
  [key: string]: any;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  membership_id: string;

  @ManyToOne(() => Membership)
  membership: Membership;

  @Column()
  forceChangePassword: boolean;

  @Column()
  taxExempt: boolean;

  @Column()
  paymentRailsType?: "individual" | "business";

  @ManyToOne(() => AccessLevel)
  access_level: AccessLevel;

  @ManyToMany(() => Role, (role) => role.id)
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => UserStatus)
  status: UserStatus;

  @Column({ default: "" })
  statusComment: string;

  @Column({ default: "" })
  pending_membership_id: string;

  @Column({ type: "timestamp", nullable: true })
  created: string;

  @Column({
    type: "time",
    nullable: true,
  })
  last_login: string;

  @Column({ nullable: true, default: "" })
  storeName: string;

  @Column({ default: false })
  paying: boolean;
}
