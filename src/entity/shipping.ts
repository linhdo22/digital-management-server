import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product";

@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  zone_name: string;
}

@Entity()
export class ShippingToZone {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  shippingId: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Shipping, (shipping) => shipping.id)
  shipping: Shipping;

}
