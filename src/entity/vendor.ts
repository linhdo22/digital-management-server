import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product";

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  companyName: string;

  @OneToMany(() => Product, (product) => product.id)
  @JoinColumn()
  product: Product;

  @Column()
  login: string;

  @Column()
  name: string;
}
